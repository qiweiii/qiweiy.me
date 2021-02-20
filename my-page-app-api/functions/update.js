import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and sort key of the item to be updated
    // - 'noteId': path parameter
    Key: {
      noteId: event.pathParameters.id
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET content = :content, editedAt = :editedAt",
    ExpressionAttributeValues: {
      ":content": data.content || null,
      ":editedAt": Date.now(),
      ":userId": event.requestContext.identity.cognitoIdentityId
    },
    // A condition that must be satisfied in order for a conditional update to succeed.
    ConditionExpression: "userId = :userId",
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW"
  };

  try {
    await dynamoDbLib.call("update", params);
    return success({ status: true });
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
