import { join } from "node:path";
import { Construct } from "constructs";
import {
  CfnOutput,
  Stack,
  aws_apigateway as apigateway,
  aws_cognito as cognito,
  aws_dynamodb as dynamodb,
  aws_lambda as lambda,
  aws_iam as iam,
} from "aws-cdk-lib";
import {
  NodejsFunction,
  NodejsFunctionProps,
} from "aws-cdk-lib/aws-lambda-nodejs";
import { AuthorizationType } from "aws-cdk-lib/aws-apigateway";

import { EnvStackProps } from "./common";

export class InfraStackQiweiyMe extends Stack {
  constructor(scope: Construct, id: string, props: EnvStackProps) {
    super(scope, id, props);

    const { config } = props;

    // ========================================================================
    // Resource: Amazon Cognito User Pool
    // ========================================================================
    // Migrating to cdk, just reference the existing user pool, no need to re-deploy and migrate users
    const userPool = cognito.UserPool.fromUserPoolId(
      this,
      "qiweiy-me-UserPool",
      config.USER_POOL_ID
    );
    const userPoolClient = cognito.UserPoolClient.fromUserPoolClientId(
      this,
      "qiweiy-me-UserPoolClient",
      config.APP_CLIENT_ID
    );
    // Identity pool is also created in old sst constructs, but cannot easily reference it here in cdk

    // Roles required to allow authenticated users to access AWS services
    // IAM role used for authenticated users (this role already exist, cannot re-deploy using cdk)
    // const authenticatedRole = new iam.Role(
    //   this,
    //   "CognitoDefaultAuthenticatedRole",
    //   {
    //     assumedBy: new iam.FederatedPrincipal(
    //       "cognito-identity.amazonaws.com",
    //       {
    //         StringEquals: {
    //           "cognito-identity.amazonaws.com:aud": config.IDENTITY_POOL_ID,
    //         },
    //         "ForAnyValue:StringLike": {
    //           "cognito-identity.amazonaws.com:amr": "authenticated",
    //         },
    //       },
    //       "sts:AssumeRoleWithWebIdentity"
    //     ),
    //   }
    // );
    // authenticatedRole.addToPolicy(
    //   new iam.PolicyStatement({
    //     effect: iam.Effect.ALLOW,
    //     actions: [
    //       "s3:*",
    //       "dynamodb:*",
    //       "mobileanalytics:PutEvents",
    //       "cognito-sync:*",
    //       "cognito-identity:*",
    //     ],
    //     resources: ["*"],
    //   })
    // );
    // new cognito.CfnIdentityPoolRoleAttachment(
    //   this,
    //   "IdentityPoolRoleAttachment",
    //   {
    //     identityPoolId: config.IDENTITY_POOL_ID,
    //     roles: { authenticated: authenticatedRole.roleArn },
    //   }
    // );

    // ========================================================================
    // Resource: Amazon Cognito Identity Pool
    // ========================================================================
    // Purpose: provide temporary AWS credentials for users who are guests (unauthenticated)
    // and for users who have been authenticated and received a token.

    // Migration to cdk, don't need to recreate the same resource

    // ========================================================================
    // Resource: Amazon S3 Bucket
    // ========================================================================

    // For now, my website only need s3://my-page-app-v2-final-deploy for frontend deployment
    // Don't need to recreate it in cdk

    // ========================================================================
    // Resource: Amazon DynamoDB Table
    // ========================================================================
    // Migration to cdk, only reference existing table here
    const dynamoTable = dynamodb.Table.fromTableName(
      this,
      "qiweiy-me-Table",
      "prod-infrastructure-dynamodb-qiweiymeTable787B6469-1JGH1F02JMF15"
    );

    // ========================================================================
    // Resource: Lambda
    // ========================================================================
    // Lambda is ok to recreate from scratch
    const nodeJsFunctionProps: NodejsFunctionProps = {
      handler: "main",
      bundling: {
        externalModules: [
          "@aws-sdk/*", // Use the '@aws-sdk' available in the Lambda runtime
          "aws-lambda",
        ],
      },
      environment: {
        tableName: dynamoTable.tableName,
      },
      runtime: lambda.Runtime.NODEJS_18_X,
    };

    // lambdas
    const createLambda = new NodejsFunction(this, "createFunction", {
      entry: join(__dirname, "../../api/functions/create.ts"),
      ...nodeJsFunctionProps,
    });
    const getLambda = new NodejsFunction(this, "getFunction", {
      entry: join(__dirname, "../../api/functions/get.ts"),
      ...nodeJsFunctionProps,
    });
    const listLambda = new NodejsFunction(this, "listFunction", {
      entry: join(__dirname, "../../api/functions/list.ts"),
      ...nodeJsFunctionProps,
    });
    const updateLambda = new NodejsFunction(this, "updateFunction", {
      entry: join(__dirname, "../../api/functions/update.ts"),
      ...nodeJsFunctionProps,
    });
    const deleteLambda = new NodejsFunction(this, "deleteFunction", {
      entry: join(__dirname, "../../api/functions/delete.ts"),
      ...nodeJsFunctionProps,
    });
    const scanLambda = new NodejsFunction(this, "scanFunction", {
      entry: join(__dirname, "../../api/functions/scan.ts"),
      ...nodeJsFunctionProps,
    });
    // db access
    dynamoTable.grantReadWriteData(createLambda);
    dynamoTable.grantReadData(getLambda);
    dynamoTable.grantReadData(listLambda);
    dynamoTable.grantReadWriteData(updateLambda);
    dynamoTable.grantReadWriteData(deleteLambda);
    dynamoTable.grantReadData(scanLambda);
    // integrate with api gateway
    const createIntegration = new apigateway.LambdaIntegration(createLambda);
    const getIntegration = new apigateway.LambdaIntegration(getLambda);
    const listIntegration = new apigateway.LambdaIntegration(listLambda);
    const updateIntegration = new apigateway.LambdaIntegration(updateLambda);
    const deleteIntegration = new apigateway.LambdaIntegration(deleteLambda);
    const scanIntegration = new apigateway.LambdaIntegration(scanLambda);

    // ========================================================================
    // API Gateway
    // ========================================================================
    // Purpose: create a REST API
    const api = new apigateway.RestApi(this, "qiweiy-me-Api", {
      restApiName: "QiweiyMe-Api",
      description: "This service serves qiweiy.me",
      deployOptions: {
        stageName: "prod",
        metricsEnabled: true,
        loggingLevel: apigateway.MethodLoggingLevel.INFO,
        dataTraceEnabled: true,
      },
      endpointTypes: [apigateway.EndpointType.EDGE],
    });
    // create authorizer
    const authorizer = new apigateway.CfnAuthorizer(this, "cfnAuth", {
      restApiId: api.restApiId,
      name: "QiweiyMeAPIAuthorizer",
      type: apigateway.AuthorizationType.COGNITO,
      identitySource: "method.request.header.Authorization",
      providerArns: [userPool.userPoolArn],
    });
    // add method with authorizer
    const methodOptions = {
      authorizationType: apigateway.AuthorizationType.COGNITO,
      authorizer: {
        authorizerId: authorizer.ref,
      },
    };
    const cors = {
      allowOrigins: apigateway.Cors.ALL_ORIGINS,
      allowMethods: apigateway.Cors.ALL_METHODS,
      allowHeaders: [...apigateway.Cors.DEFAULT_HEADERS, "identityId"],
    };
    const notes = api.root.addResource("notes");
    notes.addMethod("POST", createIntegration, methodOptions);
    notes.addMethod("GET", listIntegration, methodOptions);
    const all = notes.addResource("all");
    all.addMethod("GET", scanIntegration, {
      // public endpoint, no need authorize
      authorizationType: AuthorizationType.NONE,
    });
    const item = notes.addResource("{id}");
    item.addMethod("GET", getIntegration, {
      // public endpoint, no need authorize
      authorizationType: AuthorizationType.NONE,
    });
    item.addMethod("PUT", updateIntegration, methodOptions);
    item.addMethod("DELETE", deleteIntegration, methodOptions);
    notes.addCorsPreflight(cors);
    all.addCorsPreflight(cors);
    item.addCorsPreflight(cors);

    // ========================================================================
    // Resource: Amplify
    // ========================================================================
    // No need to recreate in cdk

    // ========================================================================
    // Resource: Cloudfront
    // ========================================================================
    // No need to recreate in cdk

    // ========================================================================
    // Resource: Export values
    // ========================================================================
    new CfnOutput(this, "UserPoolId", {
      value: userPool.userPoolId,
    });
    new CfnOutput(this, "UserPoolClientId", {
      value: userPoolClient.userPoolClientId,
    });
    new CfnOutput(this, "ApiUrl", {
      value: api.url,
    });
    new CfnOutput(this, "ApiName", {
      value: api.restApiName,
    });
  }
}
