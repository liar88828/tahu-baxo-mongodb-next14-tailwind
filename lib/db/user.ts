import prisma from '@/lib/db/prisma';

export class BankRepo {
  async findPaginate(data:{email:string, password:string} ) {

    const hasPassword = by
    return prisma.user.create({
      data:{
        email: data.email,
        password: ,
      }
    })
  }
}