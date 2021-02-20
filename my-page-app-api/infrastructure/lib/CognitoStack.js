import { CfnOutput } from "@aws-cdk/core";
import * as cognito from "@aws-cdk/aws-cognito";
import * as sst from "@serverless-stack/resources";
import * as iam from "@aws-cdk/aws-iam";
import CognitoAuthRole from "./CognitoAuthRole";

export default class CognitoStack extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const { bucketArn } = props;

    const app = this.node.root;

    const userPool = new cognito.UserPool(this, "qiweiy-me-UserPool", {
      selfSignUpEnabled: true, // Allow users to sign up
      autoVerify: { email: true }, // Verify email addresses by sending a verification code
      signInAliases: { email: true }, // Set email as an alias
    });

    const userPoolClient = new cognito.UserPoolClient(this, "qiweiy-me-UserPoolClient", {
      userPool,
      generateSecret: false, // Don't need to generate secret for web app running on browsers
    });

    const identityPool = new cognito.CfnIdentityPool(this, "qiweiy-me-IdentityPool", {
      allowUnauthenticatedIdentities: false, // Don't allow unathenticated users
      cognitoIdentityProviders: [
        {
          clientId: userPoolClient.userPoolClientId,
          providerName: userPool.userPoolProviderName,
        },
      ],
    });

    const authenticatedRole = new CognitoAuthRole(this, "qiweiy-me-CognitoAuthRole", {
      identityPool,
    });

    authenticatedRole.role.addToPolicy(
      // IAM policy granting users permission to a specific folder in the S3 bucket
      new iam.PolicyStatement({
        actions: ["s3:*"],
        effect: iam.Effect.ALLOW,
        resources: [
          bucketArn + "/private/${cognito-identity.amazonaws.com:sub}/*",
        ],
      })
    );


    // Export values
    new CfnOutput(this, "UserPoolId", {
      value: userPool.userPoolId,
    });
    new CfnOutput(this, "UserPoolClientId", {
      value: userPoolClient.userPoolClientId,
    });
    new CfnOutput(this, "IdentityPoolId", {
      value: identityPool.ref,
    });
    new CfnOutput(this, "AuthenticatedRoleName", {
      value: authenticatedRole.role.roleName,
      exportName: app.logicalPrefixedName("CognitoAuthRole"),
    });
  }
}