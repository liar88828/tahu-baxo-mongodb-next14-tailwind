import { z } from 'Zod'
import { Prisma } from '@prisma/client'

export function errorHanding(e : unknown) : Response {

  // console.error('----------')
  // console.error(e)
  // console.error('-----------')

  if (e instanceof z.ZodError) {
    return Response.json(e.issues,
      {status : 400})
  }

  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    if (e.code === 'P2002') {
      return Response.json('There is a unique constraint violation', {
        status : 400
      })
    }
    if (e.code === 'P2025') {
      return Response.json('Data is Not Found maybe was been delete', {
        status : 400
      })
    }
  }

  if (e instanceof Error) {
    return Response.json(e.message, {status : 400})
  }
  console.error(e)

  return Response.json("Server is Error", {status : 400})
}
