import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils'
import { createUser } from '../businessLogic/userLogic'

const logger = createLogger('createUser')


export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const userId = getUserId(event)
    logger.info('Creating user ', userId)
    const userDisplay = await createUser(userId)

    return {
        statusCode: 201,
        body: JSON.stringify({"New display name": userDisplay})
    }

})

handler
 .use(httpErrorHandler())
 .use(
     cors({
       credentials: true
  })
)