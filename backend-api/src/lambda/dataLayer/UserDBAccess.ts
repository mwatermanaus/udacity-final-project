import * as AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { User } from '../../models/User'

import { createLogger } from '../../utils/logger'
const logger = createLogger('User Logger')

export class UserDBAccess {

    constructor(
        private readonly documentClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
        private readonly userTable = process.env.USER_TABLE,
        private readonly userIndex = process.env.USER_DISPLAY_NAME_INDEX
    ) {}

    async getUserDetails(userId: string): Promise<User> {
        logger.info('Getting user Display name')

        const result = await this.documentClient.query({
            TableName: this.userTable,
            IndexName: this.userIndex,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
              ':userId': userId
            },
            ScanIndexForward: false
          }).promise()
        
          const user = result.Items[0]
          return user as User
    }
    
    async createNewUser(userId: string): Promise<User> {
        const newUser: User = {
            userId: userId,
            displayName: 'New user'
        }

        await this.documentClient.put({
            TableName: this.userTable,
            Item: newUser
        }).promise()

        return newUser
    }

    async updateUserDisplayName(displayName: string, userId: string): Promise<string> {
        await this.documentClient.update({
            TableName: this.userTable,
            Key: {
              userId: userId
            },
            UpdateExpression: 'set displayName = :displayName',
            ExpressionAttributeValues: {
                ":displayName": displayName
            }
          }).promise()
        return ''
    }
}