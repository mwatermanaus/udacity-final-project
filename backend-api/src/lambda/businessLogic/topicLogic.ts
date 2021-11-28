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

export async function createTopic(createTopicRequest: CreateTopicRequest, userId: string): Promise<Topic> {
    const topicId = uuid.v4()
    const timestamp = new Date().toISOString()

    const topic: Topic = {
        creatorUserId: userId,
        createdTime: timestamp,
        topicId: topicId,
        ...createTopicRequest

    }
    return await topicDbAccess.createTopic(topic)
}
