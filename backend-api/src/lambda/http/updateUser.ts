import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { User } from '../../models/User'
import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils'
import { updateUserDisplayName } from '../businessLogic/userLogic'

const logger = createLogger('updateUser')


export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const updatedUser: User = JSON.parse(event.body)
    logger.info('Updating user ', JSON.stringify(updatedUser))
    if (!updatedUser.displayName) {
        return {
            statusCode: 400,
            body: 'No display name has been entered.'
        }
    }

    const userId = getUserId(event)
    const userDisplay = await updateUserDisplayName(updatedUser.displayName, userId)

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