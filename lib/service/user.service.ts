import {LoginUser, NewPassword, RegisterUser, userSchema, UserSchema} from '@/lib/schema/user.schema'
import prisma from '../db/prisma'
import {User} from '@prisma/client'
import {bcryptService, BcryptService} from "@/lib/service/bcrypt.service";


export class UserService {
  constructor(
    private valid: UserSchema,
    private serviceBcrypt: BcryptService,
  ) {
  }

  validPassword(data: {
    password: string
    confPass: string
  }) {
    if (data.confPass !== data.password) {
      throw new Error('Password is not match')
    }
    return true
  }

  async register(data: RegisterUser, refreshToken: string) {
    data.password = await this.serviceBcrypt.hashPassword(data)
    return prisma.user.create({
      select: {
        name: true,
        email: true,
        image: true,
        password: true,
        id: true

      },
      data: {
        name: data.name,
        password: data.password,
        email: data.email,
        refresh_token: refreshToken
      },
    })
  }

  async createRefreshToken(id: string, token: string) {
    return prisma.user.update({
      where: {id},
      select: {name: true, email: true, id: true},
      data: {refresh_token: token},
    })
  }

  async deleteRefreshToken(email: string,) {
    return prisma.user.update({
      where: {email},
      select: {name: true, email: true, id: true},
      data: {refresh_token: null},
    })
  }


  async findEmail(userReq: LoginUser) {
    const data = await prisma.user.findUnique({
      where: {email: userReq.email},
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
    await this.serviceBcrypt.comparePassword(userReq.password, data.password)

    return data
  }

  async findEmailOnly({email}: { email: string }) {
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

  async foundEmail(dataReq: RegisterUser) {
    dataReq = this.valid.createValid(dataReq)
    const data = await prisma.user.findUnique({
      where: {email: dataReq.email},
      select: {
        email: true,
        name: true,
        id: true,
      }
    })
    if (data) {
      throw new Error(`Email is found used by ${data.name}`)
    }
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
  async newPassword(data: NewPassword) {
    data.password = await this.serviceBcrypt.hashPassword(data)
    return prisma.user.update({
      where: {email: data.email},
      data: {password: data.password}
    })
  }
}

export const userService = new UserService(
  userSchema,
  bcryptService,
)
