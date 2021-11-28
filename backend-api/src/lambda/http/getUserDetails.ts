import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { createLogger } from '../../utils/logger'
// import * as AWS  from 'aws-sdk'
import * as middy from 'middy'

import { cors, httpErrorHandler } from 'middy/middlewares'

import { getUserDetails } from '../businessLogic/userLogic'

const logger = createLogger('getDispplayName')

export const handler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // TODO: Get all TODO items for a current user
    logger.info('Getting the user details for ', event)
    
    if (event.headers.Authorization.split(' ').length !== 2) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          error: 'User is not logged on!'
        })
      }
    }
    
    const displayName = await getUserDetails(event)
  
    return  {
      statusCode: 200,
      body: JSON.stringify({
        "displayName": displayName
      })
    }
  }
  )
  
  handler
   .use(httpErrorHandler())
   .use(
       cors({
         credentials: true
    })
  )