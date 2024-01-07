import { Context, APIGatewayProxyEvent } from "aws-lambda";

interface QiweiyMeApiContext extends Context {
  identityId: string;
}

export default function handler(
  lambda: (
    evt: APIGatewayProxyEvent,
    context: QiweiyMeApiContext
  ) => Promise<string>
) {
  return async function (event: APIGatewayProxyEvent, context: Context) {
    let body, statusCode;

    try {
      // Get cognito user identity id here
      // Since cannot get from lambda event or context, see <https://stackoverflow.com/a/73027128>
      // I choose to pass from frontend
      let identityId = "";
      if (event.headers.identityid && event.headers.Authorization) {
        identityId = event.headers.identityid || "";
      }

      // Run the Lambda
      body = await lambda(event, { ...context, identityId });
      statusCode = 200;
    } catch (error) {
      statusCode = 500;
      body = JSON.stringify({
        error: error instanceof Error ? error.message : String(error),
      });
    }

    // Return HTTP response
    return {
      body,
      statusCode,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
  };
}
