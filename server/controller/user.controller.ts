import { RequestService } from '@/server/service/request.service'
import { userService, UserService } from '@/server/service/user.service'
import { NextRequest, NextResponse } from 'next/server'
import { errorHanding } from "@/lib/utils/errorHanding";
import { Params } from "@/interface/params";

export class UserController {
  constructor(
    protected serviceUser : UserService,
    protected serviceRequest : RequestService,
  ) {
  }

  async getUserId(_ : NextRequest, params : Params) {
    try {
      const {id} = this.serviceRequest.getId(params)
      return NextResponse.json(this.serviceUser.findId({id_user : id}))
    } catch (e : unknown) {
      return errorHanding(e)
    }
  }

  async getUserAll(_ : NextRequest,) {
    try {
      return NextResponse.json(this.serviceUser.findAll())
    } catch (e : unknown) {
      return errorHanding(e)
    }
  }

}

export const userController = new UserController(
  userService,
  new RequestService(),
)
