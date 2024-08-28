import {NewPassword, RegisterUser} from './../validator/schema/user.schema'
import prisma from '../db/prisma'
import {User} from '@prisma/client'


export class UserService {
  validPassword(data: {
    password: string
    confPassword: string
  }) {
    if (data.confPassword !== data.password) {
      throw new Error('Password is not match')
    }
    return true
  }

  async register(data: RegisterUser) {
    const res = await prisma.user.create({
      select: {
        name: true,
        email: true,
        image: true,
        password: true,

      },
      data: {
        name: data.name,
        password: data.password,
        email: data.email,
      },
    })

    return res
  }

  async findEmail({email}: { email: string }) {
    const data = await prisma.user.findUnique({
      where: {email},
      select: {
        email: true,
        name: true,
        id: true,
        password: true,
      }
    })
    if (!data) {
      throw new Error('Email is not found')
    }

    return data
  }

  async foundEmail({email}: RegisterUser) {
    const data = await prisma.user.findUnique({
      where: {email},
      select: {
        email: true,
        name: true,
        id: true,
      }
    })
    if (data) {
      throw new Error(`Email is found by ${data.name}`)
    }
    return data
  }


  async findId(id: string): Promise<User> {
    const data = await prisma.user.findUnique({
      where: {id},
    })
    if (!data) {
      throw new Error('User is not found')
    }
    return data
  }

  // async loginUser(data: LoginUser) {
  //   return this.findEmail(data)
  // }
  async newPassword({email, password}: NewPassword) {
    return prisma.user.update({
      where: {email: email},
      data: {password: password}
    })
  }
}
