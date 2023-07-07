import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions'
import parseMultipartForm from '../utils/parseMultiformData'

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  // your server-side functionality

  const fields: any = await parseMultipartForm(event)

  console.log('fileds', fields, fields.uploadImage)
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'compress folder endpoint' })
  }
}

export { handler }
