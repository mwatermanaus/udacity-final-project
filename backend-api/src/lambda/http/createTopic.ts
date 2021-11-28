import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { CreateTopicRequest } from '../../requests/CreateTopicRequest'
import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils'
import { createTopicForUser } from '../businessLogic/topicLogic'

const logger = createLogger('createTopic')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newTopic: CreateTopicRequest = JSON.parse(event.body)

    if (!newTopic.title) {
        return {
            statusCode: 400,
            body: 'No topic title entered.'
        }
    }

    logger.info('Creating new topic ', {message: JSON.stringify(newTopic) + ' creation started'})

    const userId = getUserId(event)
    const topicItem = await createTopicForUser(newTopic, userId)

    return {
        statusCode: 201,
        body: JSON.stringify({"New Topic": topicItem})
    }

})

handler
 .use(httpErrorHandler())
 .use(
     cors({
       credentials: true
  })
)