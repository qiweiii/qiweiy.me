# qiweiy.me

## Tech stack

A serverless single page restful app built with AWS and React
- Lambda & API Gateway for serverless api
- DynamoDB for database
- Cognito for user authentication and securing APIs
- S3 for hosting app and file uploads
- CloudFront for serving out app
- Route 53 for domain
- Certificate Manager for SSL
- React.js for single page app
- React Router for routing
- Material UI for the UI Kit

In 2018, this tech stack was initially learnt from [Serverless Stack tutorial](https://serverless-stack.com/), used [serverless framenwork](https://www.serverless.com/framework/docs/getting-started/) for all resources. In these years, the cloud services have changed a lot. AWS CDK came out and it was gaining popularity. And in 2020, I found [Serverless Stack](https://serverless-stack.com/) has updated their tutorials to use their own AWS CDK constructs library called `sst`. So I decided to migrate my app to use it as well, but I only migrated the ones that are easy to do following the tutorial.

In 2023/2024, I did some refactoring, switched from `npm` to `pnpm`, changed all `sst` CDK constructs and `sls` configs to raw AWS CDK constrcuts, since those 2 libraries were actually making my life more difficult, changed all `js` to `ts`, updated frontend styles, and updated lots of code since there are breaking changes from dependencies.

A new fullstack cdk template is created [here](https://github.com/qiweiii/fullstack-cdk-app).

## Deploy

```sh
# aws login
aws sso login --profile default

# infra need manual deploy
# since they don't change very often, I didn't add to ci
cd infra
cdk synth
cdk diff
cdk deploy

## client is auto deployed when push to master
## see .circleci/config.yml
```
