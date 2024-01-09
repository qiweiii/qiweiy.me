import dynamoDb from '../libs/dynamodb'
import handler from '../libs/handler'

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName!,
    FilterExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': context.identityId
    }
  }

  // Use `scan` because `query` requires an key expression with
  // partition key, which is `noteId`, but here we want any noteId.
  // Maybe I can use a Global Secondary Index for userId, so `query` can
  // be used on userId soley, but now the table is small, no need to add it
  const result = await dynamoDb.scan(params)

  // i don't need content at this stage, so rebuild the content
  for (let item of result?.Items || []) {
    if (item?.content?.content) {
      delete item?.content.content
    }
  }

  // Return the matching list of items in response body
  return JSON.stringify(result.Items)
})
