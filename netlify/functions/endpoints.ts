import type { Handler, HandlerEvent } from '@netlify/functions'
import { and, eq } from 'drizzle-orm'
import * as jose from 'jose'
import { db } from '../db/db'
import { userApiEndpoints, users } from '../db/schema'

const handler: Handler = async (event: HandlerEvent) => {
  const { authToken }: { authToken: string } = JSON.parse(event.body!)

  try {
    if (authToken === undefined) {
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

    const endPoints = await db
      .select()
      .from(userApiEndpoints)
      .where(eq(userApiEndpoints.userId, userId))

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
        'Access-Control-Max-Age': '86400'
      },
      body: JSON.stringify({ success: true, data: { endPoints: endPoints } })
    }
  } catch (error) {
    console.log('error while checking auth', error)
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
        'Access-Control-Max-Age': '86400'
      },
      body: JSON.stringify({
        success: false,
        data: { message: 'Error while logging in', userId: null }
      })
    }
  }
}

export { handler }
