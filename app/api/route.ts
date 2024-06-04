import {RequestMeta} from "next/dist/server/request-meta";

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: RequestMeta, ) {
  // console.log(request)
  console.log('cors')
  return new Response('Hello, Next.js!', {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3000/',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })

}
