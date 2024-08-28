import {NextRequest} from "next/server"

import {Params} from "@/interface/params";

export interface IController {

  findAll(request: NextRequest): Promise<Response>

  findId(request: NextRequest, params: Params): Promise<Response>
  // findPaginate(): Promise<any>

  createOne(request: NextRequest): Promise<Response>

  updateOne(request: NextRequest, params: Params): Promise<Response>

  deleteOne(request: NextRequest, params: Params): Promise<Response>
}
