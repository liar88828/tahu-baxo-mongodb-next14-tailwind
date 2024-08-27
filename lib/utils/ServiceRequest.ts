import {NextRequest} from 'next/server'
import {GetData, GetPage, GetUpdate,} from './../../interface/IServiceRequest'
import {IServiceRequest} from '../../interface/IServiceRequest'

import {Params} from "@/interface/params";

export class ServiceRequest implements IServiceRequest {
  async getUpdate<D>(request: NextRequest, params: Params): Promise<GetUpdate<D>> {
    // console.log(params)
    return {
      data: await this.getData<D>(request).then((res) => res.data),
      id: this.getId(params).id,
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

  async getData<T>(request: NextRequest): Promise<GetData<T>> {
    return {
      data: await request.json()
    }
  }
}
