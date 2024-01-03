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

In 2019, this tech stack was learnt from [Serverless Stack tutorial](https://serverless-stack.com/), and in these years, the cloud services have changed a lot. Initially I used [serverless framenwork](https://www.serverless.com/framework/docs/getting-started/) for all resources. Then AWS CDK came out and it was gaining popularity. And in 2021, I found [Serverless Stack](https://serverless-stack.com/) has updated their tutorials to use their own AWS CDK constructs library called `sst`. So I decided to migrate my app to use it as well, but I only migrated the ones that are easy to do following the tutorial.

In 2023/2024, I did some refactoring, switched from `npm` to `pnpm`, updated lots of pacakges, changed all `js` to `ts`, updated frontend styles, and updated lots of code since there are breaking changes from dependencies.

## Deploy

```sh
# deploy resources (s3, db, cognito)
cd infra
npx sst deploy

## deploy api (lambda functions)
cd ..
sls deploy -v # verbose

## client is auto deployed when push to master
## see .circleci/config.yml
```
