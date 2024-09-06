import { NextRequest } from "next/server"
import type { Params } from "./param"

export interface IController {
  findAll(request: NextRequest): Promise<Response>

  findAllPrivate(request: NextRequest): Promise<Response>

  findId(request: NextRequest, params: Params): Promise<Response>

  findIdPrivate(request: NextRequest, params: Params): Promise<Response>

  createOne(request: NextRequest): Promise<Response>

  updateOne(request: NextRequest, params: Params): Promise<Response>

  deleteOne(request: NextRequest, params: Params): Promise<Response>
}
