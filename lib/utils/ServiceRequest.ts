import { NextRequest } from 'next/server';
import { GetId, GetPage, GetData, GetUpdate } from './../../interface/IServiceRequest';
import { IServiceRequest } from '../../interface/IServiceRequest';



export class ServiceRequest implements IServiceRequest
{
  async getUpdate ( request: NextRequest ): Promise<GetUpdate>
  {
    return {
      data: await this.getData( request ).then( res => res.data),
      id: this.getId( request ).id,

    }
  }
  getId ( request: NextRequest ): GetId
  {
    return { id: 2 };
  }
  getPage ( request: NextRequest ): GetPage
  {
    return {
      page: 1,
      take: 2,
    };
  }
  async getData ( request: NextRequest ): Promise<GetData>
  {
    return {
      data: {}
    };
  }


}
