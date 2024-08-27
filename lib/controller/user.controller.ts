import { ServiceRequest } from './../utils/ServiceRequest';
import { UserSchema } from './../validator/schema/user.schema';
import { NextRequest } from 'next/server';
import { BcryptService } from "../service/bcrypt.service"
import { UserService } from "../service/user.service"

class UserController
{
  constructor (
    private serviceUser: UserService,
    private serviceBcrypt: BcryptService,
    private serviceZod: UserSchema,
    private serviceRequest: ServiceRequest
  )
  {

  }

  async create ( req: NextRequest )
  {
    let { data } = await this.serviceRequest.getData( req )
    data = this.serviceZod.createValid( data )
    data = await this.serviceUser.createOne()
    return data
  }



  async find ( req: NextRequest )
  {
    let { id } = this.serviceRequest.getId( req )
    const data = await this.serviceUser.findOne( id as String)
    if ( !data )
    {
      throw new Error( "User not found" )
    }
    return data

  }
}
export const userController = new UserController(
  new UserService(),
  new BcryptService(),
  new UserSchema(),
  new ServiceRequest()
)
