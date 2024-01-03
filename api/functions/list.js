import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

// get all blogs of an user
export async function main(event, context) {
  const params = {
    TableName: process.env.tableName,
    // filter
    FilterExpression: "userId = :userId",
    // 'KeyConditionExpression' defines the condition for the query
    ExpressionAttributeValues: {
      ":userId": event.requestContext.identity.cognitoIdentityId
    }
  };

  try {
    // const result = await dynamoDbLib.call("query", params)
    // I have to use scan...(either here or in getItem)
    const result = await dynamoDbLib.call("scan", params);
    for (let item of result.Items) {
      delete item.content.content;
    }
    // Return the matching list of items in response body
    return success(result.Items);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
