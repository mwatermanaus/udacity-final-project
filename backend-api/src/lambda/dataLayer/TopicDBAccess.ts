import * as AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'

import { Topic } from 'src/models/Topic'

export class TopicDBAccess {

    constructor(
        private readonly documentClient: DocumentClient = AWS.DynamoDB.DocumentClient(),
        private readonly topicTable = process.env.TOPIC_TABLE,
        private readonly topicIndex = process.env.TOPIC_CREATED_AT_INDEX
    ) {}

    async getAllTopicsForUser(userId: string): Promise<Topic[]>{
        const result = await this.documentClient.query({
            TableName: this.topicTable,
            IndexName: this.topicIndex,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            },
            ScanIndexForward: false
        }).promise()
        console.log('UserID ', userId)
        const topicsList = result.Items
        return topicsList as Topic[]
    }

    async createTopic(topic: Topic): Promise<Topic> {
        await this.documentClient.put({
            TableName: this.topicTable,
            Item: topic
        }).promise()

        return topic
    }
}

