import jwt from 'jsonwebtoken'
import { User } from "@prisma/client";

// type PayloadToken = {
//   email : string,
//   name : string,
//   id : string,
//   trolleyId : string,
// };
type PayloadToken = Pick<User, 'id' | 'email' | 'name' | 'trolleyId'>
export type RefreshTokenPayload = Omit<PayloadToken, 'id' | 'trolleyId'>
export type AccessTokenPayload = PayloadToken

export class JwtService {
  constructor(
    private accessSecret : string = process.env.ACCESSTOKENSECRET ?? "access",
    private refreshSecret : string = process.env.REFRESHTOKENSECRET ?? "refresh",
    private accessExp : string = '1h',
    private refreshExp : string = '7d',
  ) {
  }

  static jwtPayloadStatic(token : string,
                          // willThrow : boolean = true
  ) {
    const data = jwt.decode(
      token,
      {json : true})
    if (!data) {
      throw new Error("Token is not verified")
    }
    return data
  }

  refreshToken({email, name} : RefreshTokenPayload) {
    return jwt.sign({email, name},
      this.refreshSecret,
      {expiresIn : this.refreshExp}
    )
  }

  verifyAccess(token : string) {
    // will return invalid not throw
    const data = jwt.verify(token, this.accessSecret,)
    if (!data) {
      throw new Error("Token is not verified")
    }
    console.log(data)
    return data
  }

  verifyRefresh(token : string) {
    const data = jwt.verify(token, this.refreshSecret,)
    if (!data) {
      throw new Error("Token is not verified")
    }
    return data
  }

  accessToken({email, name, id} : AccessTokenPayload) {
    return jwt.sign({email, name, id},
      this.accessSecret,
      {expiresIn : this.accessExp}
    )
  }

  jwtPayload(token : string, willThrow : boolean = true) {
    return JwtService.jwtPayloadStatic(token,)
  }

  testComplete(token : string) {
    return jwt.decode(token,
      {
        complete : true
      })
  }
}
