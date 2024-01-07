import handler from "../libs/handler";
import dynamoDb from "../libs/dynamodb";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName!,
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId'
    //   partition key
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be Identity Pool identity id
    //   of the authenticated user
  };

  const result = await dynamoDb.scan(params);

  // i don't need content at this stage, so rebuild the content
  for (let item of result.Items || []) {
    if (item?.content?.content) {
      delete item?.content.content;
    }
  }

  // Return the matching list of items in response body
  return JSON.stringify(result.Items);
});
