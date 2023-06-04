import type { Handler, HandlerEvent } from '@netlify/functions'

import { and, eq } from 'drizzle-orm'
import * as jose from 'jose'
import { db } from '../db/db'
import { userApiEndpoints, users } from '../db/schema'
import { customAlphabet } from 'nanoid'
const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 10)

const handler: Handler = async (event: HandlerEvent) => {
  const {
    apiKey,
    folderName,
    storageName,
    authToken
  }: { apiKey: string; folderName: string; storageName: string; authToken: string } = JSON.parse(
    event.body!
  )

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)

    const { payload } = await jose.jwtVerify(authToken, secret)

    const userExists = await db
      .select({ userId: users.userId })
      .from(users)
      .where(
        and(eq(users.userId, payload.uid as string), eq(users.userAuthId, payload.uauth as string))
      )

    if (userExists.length < 1) {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
          'Access-Control-Max-Age': '86400'
        },
        body: JSON.stringify({
          success: true,
          data: { message: 'Please Login', userId: null, isAuth: false }
        })
      }
    }

    const { userId } = userExists[0]

    const endpointId = nanoid()

    await db.insert(userApiEndpoints).values({
      apiKey: apiKey,
      endpointId: endpointId,
      provider: 'bunnycdn',
      folderName: folderName,
      storageName: storageName,
      userId: userId
    })

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
        'Access-Control-Max-Age': '86400'
      },
      body: JSON.stringify({
        success: true,
        data: { message: 'Endpoint added successfully', endpointId: endpointId }
      })
    }
  } catch (error) {
    console.log('error while adding user', error)
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
        'Access-Control-Max-Age': '86400'
      },
      body: JSON.stringify({ success: false, data: { message: 'Error while adding endpoint' } })
    }
  }
}

export { handler }
