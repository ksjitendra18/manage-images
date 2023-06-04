import type { Handler, HandlerEvent } from '@netlify/functions'
import { eq } from 'drizzle-orm'
import { db } from '../db/db'
import { userApiEndpoints } from '../db/schema'

const URL = process.env.ENV_INFO === 'dev' ? 'http://localhost:9999' : ''

const handler: Handler = async (event: HandlerEvent) => {
  const {
    authToken,
    endPointId,
    fileName
  }: { authToken: string; endPointId: string; fileName: string } = JSON.parse(event.body!)
  try {
    const authRes = await fetch(`${URL}/.netlify/functions/status`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ authToken: authToken })
    })

    const authData = await authRes.json()

    const userId = authData.data.userId

    const endpointDetails = await db
      .select()
      .from(userApiEndpoints)
      .where(eq(userApiEndpoints.endpointId, endPointId))

    if (endpointDetails.length === 0) {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
          'Access-Control-Max-Age': '86400'
        },
        body: JSON.stringify({
          success: true,
          data: { message: 'No such endpoint exists. Check url', notFound: true }
        })
      }
    } else if (endpointDetails.length > 0 && endpointDetails[0].userId !== userId) {
      return {
        statusCode: 401,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
          'Access-Control-Max-Age': '86400'
        },
        body: JSON.stringify({ success: true, data: { message: 'Not authorized ' } })
      }
    }

    const bunnyCdnUrl = `https://storage.bunnycdn.com/${endpointDetails[0].storageName}/${endpointDetails[0].folderName}/${fileName}`
    const bunnyCdnOptions = {
      method: 'DELETE',
      headers: {
        AccessKey: endpointDetails[0].apiKey
      }
    }

    const deleteRes = await fetch(bunnyCdnUrl, bunnyCdnOptions)
    const deleteResData = await deleteRes.json()

    if (deleteResData.HttpCode === 404) {
      return {
        statusCode: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
          'Access-Control-Max-Age': '86400'
        },
        body: JSON.stringify({ success: true, data: { error: true, message: 'Not a valid image' } })
      }
    }
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
        'Access-Control-Max-Age': '86400'
      },
      body: JSON.stringify({
        success: true,
        data: { deleted: true, message: 'Deleted successfully' }
      })
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
