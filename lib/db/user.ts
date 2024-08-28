import prisma from '@/lib/db/prisma';

export class User {
  async create( data: {
    email: string,
    password: string
  } ) {

    // const hasPassword = bcrypt.hash( data.password, 10 )
    return prisma.user.create( {
      data: {
        email: data.email,
        // password: data.password,
        name         : 'test',
        image        : 'test',
        // emailVerified: null,
        role         : 'test',
      }
    } )
  }
}
