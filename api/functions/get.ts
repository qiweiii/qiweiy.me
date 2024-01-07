import handler from "../libs/handler";
import dynamoDb from "../libs/dynamodb";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName!,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'noteId': path parameter
    Key: {
      noteId: event?.pathParameters?.id,
    },
  };

  const result = await dynamoDb.get(params);
  if (!result.Item) {
    throw new Error("Item not found.");
  }

  // Return the retrieved item
  return JSON.stringify(result.Item);
});
