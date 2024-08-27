export interface IController {
  findAll(): Promise<any>

  findOne(): Promise<any>

  // findPaginate(): Promise<any>

  createOne(): Promise<any>

  updateOne(): Promise<any>

  deleteOne(): Promise<any>
}
