import type { Handler, HandlerEvent } from '@netlify/functions'
import bcrypt from 'bcrypt'
import { eq } from 'drizzle-orm'
import * as jose from 'jose'
import { customAlphabet } from 'nanoid'
import { db } from '../db/db'
import { users } from '../db/schema'

const handler: Handler = async (event: HandlerEvent) => {
  const { name, email, password }: { name: string; email: string; password: string } = JSON.parse(
    event.body!
  )

  const nanoid = customAlphabet(
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    15
  )

  try {
    // returns an empty array if user is not found...
    const existingUser = await db.select().from(users).where(eq(users.email, email))

    if (existingUser.length > 0) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
          'Access-Control-Max-Age': '86400'
        },
        body: JSON.stringify({ success: false, message: 'User already exists' })
      }
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const userId = nanoid()
    const userAuthId = nanoid()
    await db.insert(users).values({
      name: name,
      email: email,
      password: hashedPassword,
      userAuthId: userAuthId,
      userId: userId
    })

    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const alg = 'HS256'

    const jwt = await new jose.SignJWT({
      uid: userId,
      uauth: userAuthId
    })
      .setProtectedHeader({ alg })
      .setExpirationTime('48h')
      .sign(secret)

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
        'Access-Control-Max-Age': '86400'
      },
      body: JSON.stringify({ success: true, data: { authToken: jwt } })
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
      body: JSON.stringify({ success: false, data: null })
    }
  }
}

export { handler }
