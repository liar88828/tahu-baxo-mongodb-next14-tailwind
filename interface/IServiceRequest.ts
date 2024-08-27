import { NextRequest } from 'next/server';


export type GetId = {
  id: string | number
}
export type GetPage = {
  page: number
  take: number
}

export type GetData = {
  data: Object
}

export type GetUpdate = {
  data: Object
  id: string | number
}
export interface IServiceRequest
{
  getId ( request: NextRequest ): GetId;
  getPage ( request: NextRequest ): GetPage;
  getData ( request: NextRequest ): Promise<GetData>;
  getUpdate ( request: NextRequest ): Promise<GetUpdate>
}
