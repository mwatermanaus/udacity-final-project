import * as AWS from 'aws-sdk'

import { Topic } from 'src/models/Topic'

export class TopicDBAccess {

    constructor(
        private readonly documentClient: DocumentClient = AWS.DynamoDB.DocumentClient(),
        private readonly topicTable = process.env.TOPIC_TABLE,
        private readonly topicIndex = process.env.TOPIC_CREATED_AT_INDEX
    ) {}

    aysnc getAllTopics(): Promise<Topic[]>{
        const result = await this.documentClient.query({
            TableName: this.topicTable,
            IndexName: this.topicIndex
        }).promise()

        const topicsList = result.Items
        return topicsList
    }

    async createTopic(topic: Topic): Promise<Topic> {
        await this.documentClient.put({
            TableName: this.topicTable,
            Item: topic
        }).promise()

        return topic
    }
}

