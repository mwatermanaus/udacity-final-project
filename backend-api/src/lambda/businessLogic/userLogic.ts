import { UserDBAccess } from '../dataLayer/UserDBAccess'
import { getUserId } from '../utils'
import { User } from '../../models/User'

import { APIGatewayProxyEvent } from 'aws-lambda'
// import * as uuid from 'uuid'

const userDbAccess = new UserDBAccess()

export async function createUser(userId: string) : Promise<User> {
    // const userId = getUserId(event)
    return await userDbAccess.createNewUser(userId)
}

export async function updateUserDisplayName(displayName: string, userId: string): Promise<string> {

    return await userDbAccess.updateUserDisplayName(displayName, userId)
}

export async function getUserDetails(event: APIGatewayProxyEvent): Promise<User> {
    const userId = getUserId(event)
    return await userDbAccess.getUserDetails(userId)
}