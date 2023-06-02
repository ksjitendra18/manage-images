import type { Handler, HandlerEvent } from '@netlify/functions'
import bcrypt from 'bcrypt'
import { eq } from 'drizzle-orm'
import * as jose from 'jose'
import { db } from '../db/db'
import { users } from '../db/schema'

const handler: Handler = async (event: HandlerEvent) => {
  const { email, password }: { email: string; password: string } = JSON.parse(event.body!)

  try {
    // returns an empty array if user is not found...
    const existingUser = await db.select().from(users).where(eq(users.email, email))

    if (existingUser.length < 0) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
          'Access-Control-Max-Age': '86400'
        },
        body: JSON.stringify({ success: false, message: 'Please check email and password' })
      }
    }

    const validPassword = await bcrypt.compare(password, existingUser[0].password!)

    if (!validPassword) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
          'Access-Control-Max-Age': '86400'
        },
        body: JSON.stringify({ success: false, message: 'Please check email and password' })
      }
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const alg = 'HS256'

    const jwt = await new jose.SignJWT({
      uid: existingUser[0].userId,
      uauth: existingUser[0].userAuthId
    })
      .setProtectedHeader({ alg })
      .setExpirationTime('48h')
      .sign(secret)

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
        'Access-Control-Max-Age': '86400',
        'auth-token': jwt
      },
      body: JSON.stringify({ success: true, data: { authToken: jwt } })
    }
  } catch (error) {
    console.log('error while adding user', error)
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Expose-Headers': '*',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
        'Access-Control-Max-Age': '86400'
      },
      body: JSON.stringify({ success: false, data: null })
    }
  }
}

export { handler }
