import {LoginUser, NewPassword, RegisterUser} from '../validator/schema/user.schema'
import {RequestService} from '../service/request.service'
import {UserSchema} from './../validator/schema/user.schema'
import {UserService} from '../service/user.service'
import {NextRequest} from 'next/server'
import {errorHanding} from "@/lib/utils/errorHanding";
import {BcryptService} from "@/lib/service/bcrypt.service";
import {OtpSchema, OtpService} from "@/lib/service/otp.service";

class UserController {
  constructor(
    private serviceUser: UserService,
    private serviceBcrypt: BcryptService,
    private serviceZod: UserSchema,
    private serviceRequest: RequestService,
    private serviceOtp: OtpService
  ) {
  }

// auth
  async register(req: NextRequest) {
    try {
      let {data} = await this.serviceRequest.getData<RegisterUser>(req)
      this.serviceUser.validPassword(data)
      data = this.serviceZod.createValid(data)

      await this.serviceUser.foundEmail(data)
      data.password = await this.serviceBcrypt.hashPassword(data)

      const res = await this.serviceUser.register(data)
      return Response.json(res)
    } catch (e: unknown) {
      return errorHanding(e)
    }
  }

  async login(req: NextRequest) {
    try {
      let {data} = await this.serviceRequest.getData<LoginUser>(req)
      const userDb = await this.serviceUser.findEmail(data)
      await this.serviceBcrypt.comparePassword(data.password, userDb.password)

    } catch (e: unknown) {
      return errorHanding(e)
    }
  }

  async logout(req: NextRequest) {
    //delete cookie and delete session
  }

// end auth

// forgot
  async forgot(req: NextRequest) {
//send forget to email or phone

  }


  async validOtp(req: NextRequest) {
    try {
      const {data} = await this.serviceRequest.getData<OtpSchema>(req)
      const userDb = await this.serviceUser.findEmail(data)
      this.serviceOtp.validOtp(data.otp, userDb.email)
    } catch (e) {
      errorHanding(e)
    }
  }

  getOtp(req: NextRequest) {
    try {
      const data = this.serviceOtp.generate()
      return Response.json(data)
    } catch (e) {
      errorHanding(e)
    }

  }

  getAgain(req: NextRequest) {
    throw new Error("not implemented")
  }

  sendEmail(req: NextRequest) {
    try {
      const data = this.serviceOtp.sendEmail()
      return Response.json(data)
    } catch (e) {
      errorHanding(e)
    }
  }

  async newPassword(req: NextRequest) {
    try {

      const {data} = await this.serviceRequest.getData<NewPassword>(req)
      this.serviceUser.validPassword(data)
      data.password = await this.serviceBcrypt.hashPassword(data)
      const res = await this.serviceUser.newPassword(data)
      return Response.json(res)
    } catch (e: unknown) {
      return errorHanding(e)
    }
  }


  generateToken(req: NextRequest) {
    // maybe jwt or session
    return Promise.resolve(undefined);
  }
}

export const userController = new UserController(
  new UserService(),
  new BcryptService(),
  new UserSchema(),
  new RequestService(),
  new OtpService()
)
