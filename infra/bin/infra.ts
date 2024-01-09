#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib'
import { InfraStackQiweiyMe } from '../lib/infra-stack'
import { getConfig } from '../lib/config'

const app = new cdk.App()

const config = getConfig()

new InfraStackQiweiyMe(app, 'qiweiyMeWebsiteStack', {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: {
  //   account: process.env.CDK_DEFAULT_ACCOUNT,
  //   region: process.env.CDK_DEFAULT_REGION,
  // },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
  config
})
