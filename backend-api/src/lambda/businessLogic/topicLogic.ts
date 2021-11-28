import { TopicDBAccess } from '../dataLayer/TopicDBAccess'
import { Topic } from '../../models/Topic'
import { CreateTopicRequest } from '../../requests/createTopicRequest'
import { getUserId } from '../utils'

import { APIGatewayProxyEvent } from 'aws-lambda'
import * as uuid from 'uuid'

const topicDbAccess = new TopicDBAccess()

export async function getAllTopicsForUser(event: APIGatewayProxyEvent): Promise<Topic[]> {
    const userId = getUserId(event)
    return topicDbAccess.getAllTopicsForUser(userId)    
}

export async function createTopicForUser(
        createTopicRequest: CreateTopicRequest, 
        userId: string): Promise<Topic> {
    const topicId = uuid.v4()
    const timestamp = new Date().toISOString()
    console.log(userId)
    const topic: Topic = {
        userId: userId,
        createdAt: timestamp,
        topicId: topicId,
        ...createTopicRequest

    }
    return await topicDbAccess.createTopicForUser(topic)
}
