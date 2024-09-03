export const errorPrisma = (e : string) : Response => {
  if (e === 'P2002') {
    return Response.json('There is a unique constraint violation', {
      status : 400
    })
  }
  if (e === 'P2003') {
    return Response.json(`There is a unique problem maybe the relational id key is not found or not valid`, {
      status : 400
    })
  }
  if (e === 'P2025') {
    return Response.json('Data is Not Found maybe was been delete', {
      status : 400
    })
  }
  return Response.json('Unknown Error Prisma')
}
