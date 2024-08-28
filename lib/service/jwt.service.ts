import jwt from 'jsonwebtoken'

type PayloadToken = {
  email: string,
  name: string,
  id: string,
};
export type RefreshTokenPayload = Omit<PayloadToken, 'id'>
export type AccessTokenPayload = PayloadToken

export class JwtService {
  constructor(
    private accessSecret: string = process.env.ACCESSTOKENSECRET ?? "access",
    private refreshSecret: string = process.env.REFRESHTOKENSECRET ?? "refresh",
    private accessExp: string = '1h',
    private refreshExp: string = '7d',
  ) {
  }

  accessToken({email, name, id}: PayloadToken) {
    return jwt.sign({email, name, id},
      this.accessSecret,
      {expiresIn: this.accessExp}
    )
  }

  refreshToken({email, name}: RefreshTokenPayload) {
    return jwt.sign({email, name},
      this.refreshSecret,
      {expiresIn: this.refreshExp}
    )
  }

  verifyAccess(token: string) {
    // will return invalid not throw
    const data = jwt.verify(token, this.accessSecret,)
    if (!data) {
      throw new Error("Token is not verified")
    }
    console.log(data)
    return data
  }

  verifyRefresh(token: string) {
    const data = jwt.verify(token, this.refreshSecret,)
    if (!data) {
      throw new Error("Token is not verified")
    }
    return data
  }

  jwtPayload(token: string, willThrow: boolean = true) {
    const data = jwt.decode(token,
      {json: true,},)
    if (willThrow) {
      if (!data) {
        throw new Error("Token is not verified")
      }
    }
    return data
  }

  testComplete(token: string) {
    return jwt.decode(token,
      {
        complete: true
      })
  }
}
