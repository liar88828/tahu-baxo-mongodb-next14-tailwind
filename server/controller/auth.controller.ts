import { LoginUser, RegisterUser } from '@/server/schema/user.schema'
import { RequestService } from '@/server/service/request.service'
import { userService, UserService } from '@/server/service/user.service'
import { NextRequest } from 'next/server'
import { errorHanding } from "@/lib/error/errorHanding";
import { JwtService, RefreshTokenPayload } from "@/server/service/jwt.service";
import { UserController } from "@/server/controller/user.controller";

class AuthController extends UserController {
  constructor(
    protected serviceUser : UserService,
    protected serviceRequest : RequestService,
    private serviceJwt : JwtService
  ) {
    super(
      serviceUser,
      serviceRequest,
    )
  }

// auth
  async register(req : NextRequest) {
    try {
      // validation
      let {data} = await this.serviceRequest.getData<RegisterUser>(req)
      this.serviceUser.validPassword(data)
      await this.serviceUser.foundEmail(data)
      // hash
      // token
      const refreshToken = this.serviceJwt.refreshToken({email : data.email, name : data.fullname})
      const {password, ...userDb} = await this.serviceUser.register(data, refreshToken)
      const accessToken = this.serviceJwt.accessToken(userDb)
      //send
      // req.cookies.set('Set-Cookie', `token=${accessToken} `)
      return Response.json({
        accessToken,
        refreshToken,
        data : userDb
      }, {
        headers : {
          "Set-Cookie" : `token=${accessToken}`
        }
      })
    } catch (e : unknown) {
      return errorHanding(e)
    }
  }

  async login(req : NextRequest) {
    try {
      // valid
      let {data} = await this.serviceRequest.getData<LoginUser>(req)
      const {password, ...userDb} = await this.serviceUser.findEmail(data)
      // token
      const accessToken = this.serviceJwt.accessToken(userDb)
      const refreshToken = this.serviceJwt.refreshToken(userDb)
      await this.serviceUser.createRefreshToken(userDb.id, refreshToken)
      // send
      return Response.json({
        accessToken,
        refreshToken,
        data : userDb
      }, {
        status : 200,
        headers : {
          "Set-Cookie" : `token=${accessToken}`
        }
      })
    } catch (e : unknown) {
      return errorHanding(e)
    }
  }

  async logout(req : NextRequest) {
    try {
      // const token = req.cookies.get('token')
      // if (!token) {
      //   return Response.json("user has logout", {status: 204})
      // }
      // valid
      const token = this.serviceRequest.getTokenCookie(req)
      const refreshPayload = this.serviceJwt.jwtPayload(token) as RefreshTokenPayload
      // delete
      await this.serviceUser.deleteRefreshToken(refreshPayload.email)
      req.cookies.delete('token')
      // send
      return Response.json("success logout",
        {
          headers : {
            // "Authorization": `Bearer `,
            "Set-Cookie" : `token=`
          },
        })
    } catch (e) {
      return errorHanding(e)
    }
  }

  async refreshToken(req : NextRequest) {
    try {
      // valid
      const token = this.serviceRequest.getTokenCookie(req)
      // const refreshToken = this.serviceJwt.verifyRefresh(token)
      //
      const refreshToken = this.serviceJwt.jwtPayload(token) as RefreshTokenPayload

      return Response.json('test',
        {
          status : 200,
          headers : {
            'Set-Cookie' : `token=${refreshToken}`
          },
        })
    } catch (e) {
      return errorHanding(e)
    }
  }

  async test(req : NextRequest) {
    try {

      const bearer = req.headers.get('Authorization')
      if (!bearer) {
        return Response.json("not token", {status : 404})
      }
      // console.log(bearer)
      const accessToken = bearer.split(' ')[1]
      // console.log(accessToken)
      // const token = req.cookies.get('token')
      // if (!token) {
      //   return Response.json("not have token", {status: 204})
      // }
      const data = this.serviceJwt.verifyAccess(accessToken)
      //
      console.log('---test woi-')
      console.log(data)
      console.log('----')
      // console.log(this.serviceJwt.testJson(accessToken))
      // console.log(this.serviceJwt.testComplete(accessToken))

      return Response.json('test')
    } catch (e) {
      return errorHanding(e)
    }
  }

// end auth

}

export const authController = new AuthController(
  userService,
  new RequestService(),
  new JwtService()
)
