import {ServiceBank} from "@/lib/db/bank";
import {BankSchema} from "@/lib/validator/schema/bank.schema";
import {IController} from "@/interface/IController";
import {ISchema} from "@/interface/ISchema";


class BankController implements IController {
  constructor(
    private serviceBank: ServiceBank,
    private serviceZod: ISchema
  ) {
  }


  async findAll(request: NextRequest) {
    try {
      const data = await this.serviceBank.findPaginate()
      return NextResponse.json(data, {status: 200})
    } catch (e: unknown) {
      return e.message
    }
  }

  async findOne(request: NextRequest) {
    try {
      let {id} = request
      id = this.serviceZod.idValid(id)
      return this.serviceBank.findOne(id)
    } catch (e: unknown) {
      return e.message
    }
  }

  async createOne(request: NextRequest) {
    try {
      let {data,} = request
      data = this.serviceZod.createValid(data)
      return this.serviceBank.createOne(data)
    } catch (e: unknown) {
      return e.message
    }

  }

  async updateOne(request: NextRequest) {
    try {
      let {data, id} = request
      id = this.serviceZod.idValid(id)
      data = this.serviceZod.updateValid(data)
      return this.serviceBank.updateOne(data, id)
    } catch (e: unknown) {
      return e.message
    }
  }

  async deleteOne() {
    try {
      let {id} = request
      id = this.serviceZod.idValid(id)
      return this.serviceBank.deleteOne(id)
    } catch (e: unknown) {
      return e.message
    }
  }
}


export const bankController = new BankController(
  new ServiceBank(),
  new BankSchema()
)
