export default {
  s3: { // I am not using s3 for now
    REGION: "ap-southeast-1",
    BUCKET: "prod-infrastructure-s3-qiweiymeuploads67a98ec1-1v51vlerovzmv"
  },
  apiGateway: {
    REGION: "ap-southeast-1",
    URL: "https://syv3o1vida.execute-api.ap-southeast-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "ap-southeast-1",
    USER_POOL_ID: "ap-southeast-1_lYqEqsDj1",
    APP_CLIENT_ID: "6mcc8p25cgq7ah8uv4d23tej8s",
    IDENTITY_POOL_ID: "ap-southeast-1:a57d7f69-f032-45dc-a093-3df28d657a18",
  },
  social: {
    FB: "392850254647812",
    GG: "368733083641-ae2t86a7fnhhefljijhj0b93u9j1fb9m.apps.googleusercontent.com",
  },
};
