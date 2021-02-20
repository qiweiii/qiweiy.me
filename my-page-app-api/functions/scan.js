import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context) {
  const params = {
    TableName: process.env.tableName,
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId'
    //   partition key
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be Identity Pool identity id
    //   of the authenticated user
  };

  try {
    const result = await dynamoDbLib.call("scan", params);
    // i don't need content at this stage, so rebuild the content
    for (let item of result.Items) {
      delete item.content.content;
    }
    // console.log(result.Items);
    // console.log("end testing part\n");
    return success(result.Items);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}