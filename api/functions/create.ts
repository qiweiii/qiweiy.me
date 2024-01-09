import { v1 } from 'uuid'

import dynamoDb from '../libs/dynamodb'
import handler from '../libs/handler'

export const main = handler(async (event, context) => {
  let data = {
    content: ''
  }

  if (event.body) {
    data = JSON.parse(event.body)
  }

  const params = {
    TableName: process.env.tableName!,
    Item: {
      // The attributes of the item to be created
      userId: context.identityId, // The id of the author
      noteId: v1(), // A unique uuid
      content: data.content, // Parsed from request body
      createdAt: Date.now(), // Current Unix timestamp
      editedAt: Date.now() // Current Unix timestamp
    }
  }

  await dynamoDb.put(params)

  return JSON.stringify(params.Item)
})
