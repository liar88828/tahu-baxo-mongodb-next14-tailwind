export interface IController {
  findAll ( request: NextRequest ): Promise<any>

  findOne ( request: NextRequest ): Promise<any>

  // findPaginate(): Promise<any>

  createOne ( request: NextRequest ): Promise<any>

  updateOne ( request: NextRequest ): Promise<any>

  deleteOne ( request: NextRequest ): Promise<any>
}
