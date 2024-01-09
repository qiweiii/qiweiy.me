import {
  DeleteCommand,
  DeleteCommandInput,
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandInput,
  PutCommand,
  PutCommandInput,
  QueryCommand,
  QueryCommandInput,
  ScanCommand,
  ScanCommandInput,
  UpdateCommand,
  UpdateCommandInput
} from '@aws-sdk/lib-dynamodb'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'

const ddbClient = new DynamoDBClient()
const client = DynamoDBDocumentClient.from(ddbClient)

export default {
  get: (params: GetCommandInput) => client.send(new GetCommand(params)),
  put: (params: PutCommandInput) => client.send(new PutCommand(params)),
  query: (params: QueryCommandInput) => client.send(new QueryCommand(params)),
  update: (params: UpdateCommandInput) => client.send(new UpdateCommand(params)),
  delete: (params: DeleteCommandInput) => client.send(new DeleteCommand(params)),
  scan: (params: ScanCommandInput) => client.send(new ScanCommand(params))
}
