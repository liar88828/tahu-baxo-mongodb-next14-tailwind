import {NextRequest} from 'next/server'
import {GetData, GetPage, GetUpdate, IServiceRequest,} from '../../interface/IServiceRequest'

import {Params} from "@/interface/params";

export class RequestService implements IServiceRequest {
  async getUpdate<D, >(request: NextRequest, params: Params): Promise<GetUpdate<D, string>> {
    // console.log(params)
    return {
      data: await this.getData<D>(request).then((res) => res.data),
      id: this.getId(params).id,
    }
  }

  async getUpdateInt<D>(request: NextRequest, params: Params): Promise<GetUpdate<D, number>> {
    return {
      data: await this.getData<D>(request).then((res) => res.data),
      id: this.getIdInt(params).id,
    }
  }


  getId({params}: Params): { id: string } {
    return {id: params.id}
  }

  getIdInt({params}: Params): { id: number } {
    return {id: Number(params.id)}
  }

  getPage(request: NextRequest): GetPage {
    const searchParams = request.nextUrl.searchParams
    let page = Number(searchParams.get('page') ?? 1)
    const take = Number(searchParams.get('take') ?? 100)
    page = page < 0 ? 1 : page
    return {
      page,
      take,
    }
  }


  getEmail(request: NextRequest): { email: string } {
    const searchParams = request.nextUrl.searchParams
    let email = searchParams.get('email')
    if (!email) {
      throw new Error("please add email, this email empty")
    }

    return {email}
  }


  async getData<T>(request: NextRequest): Promise<GetData<T>> {
    return {
      data: await request.json()
    }
  }
}
