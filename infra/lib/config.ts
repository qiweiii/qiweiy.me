import * as dotenv from "dotenv";
import path = require("path");

// 1. Configure dotenv to read from our `.env` file
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// 2. Define a TS Type to type the returned envs from our function below.
export type ConfigProps = {
  REGION: string;
  BUCKET: string;
  URL: string;
  USER_POOL_ID: string;
  APP_CLIENT_ID: string;
  IDENTITY_POOL_ID: string;
};

// 3. Define a function to retrieve our env variables
export const getConfig = (): ConfigProps => ({
  REGION: process.env.REGION || "ap-southeast-1",
  BUCKET: process.env.BUCKET || "",
  URL: process.env.URL || "",
  USER_POOL_ID: process.env.USER_POOL_ID || "",
  APP_CLIENT_ID: process.env.APP_CLIENT_ID || "",
  IDENTITY_POOL_ID: process.env.IDENTITY_POOL_ID || "",
});
