import dynamoDb from '../libs/dynamodb'
import handler from '../libs/handler'

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName!,
    // 'Key' defines the partition key and sort key of the item to be removed
    // - 'noteId': path parameter
    Key: {
      noteId: event?.pathParameters?.id
    },
    // A condition that must be satisfied in order for a conditional update to succeed.
    ConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': context.identityId
    }
  }

  await dynamoDb.delete(params)

  return JSON.stringify({ status: true })
})
