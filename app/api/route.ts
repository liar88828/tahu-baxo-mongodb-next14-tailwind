import {NextRequest} from "next/server";

export async function GET(request: NextRequest,) {
  return Response.json('hello');
}

// export async function GET(request: RequestMeta, ) {
//   console.log('cors')
//   return new Response('Hello, Next.js!', {
//     status: 200,
//     headers: {
//       'Access-Control-Allow-Origin': 'http://localhost:3000/',
//       'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//       'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//     },
//   })
//
// }
