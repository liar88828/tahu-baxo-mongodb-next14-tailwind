import { orderService, OrderService } from "@/server/service/order.service"
import { productService, ProductService, } from "@/server/service/product.service"
import { userService, UserService } from "@/server/service/user.service"
import { bankService, BankService } from "@/server/service/bank.service"
import { NextRequest, NextResponse } from "next/server"
import { errorHanding } from "@/lib/error/errorHanding"
import { requestService, RequestService, } from "@/server/service/request.service"
import { transactionService, TransactionService, } from "@/server/service/transaction.service"
import prisma from "@/config/prisma"
import type { Params } from "@/interface/server/param"
import type { ProductTransaction } from "@/interface/model/product.type"
import { CheckoutCreateSchema } from "@/interface/model/checkout.type";

class TransactionController {
	constructor(
		private serviceReq: RequestService,
		private serviceOrder: OrderService,
		private serviceProduct: ProductService,
		private serviceUser: UserService,
		private serviceBank: BankService,
		private serviceTransaction: TransactionService
	) {
	}
	
	async createCheckoutPrivate(req: NextRequest) {
		try {
			const user = await this.serviceReq.getUserPayload(req)
			let { data } = await this.serviceReq.getData<CheckoutCreateSchema>(req)
			const res = await this.serviceTransaction.createOne(data, user)
			return Response.json(res)
		} catch (e) {
			return errorHanding(e)
		}
	}
	
	async findAllCheckoutPrivate(req: NextRequest) {
		try {
			const user = await this.serviceReq.getUserPayload(req)
			let { page, take } = this.serviceReq.getPage(req)
			const data = this.serviceOrder.findAll(page, take, user)
			return Response.json(data)
		} catch (e) {
			return errorHanding(e)
		}
	}
	
	async findAll(req: NextRequest) {
		try {
			const user = await this.serviceReq.getUserPayload(req)
			let { page, take } = this.serviceReq.getPage(req)
			const data = this.serviceOrder.findAll(page, take, user)
			return Response.json(data)
		} catch (e) {
			return errorHanding(e)
		}
	}
	
	async findId(req: NextRequest, param: Params) {
		try {
			const user = this.serviceReq.getUserPayload(req)
			let { id } = this.serviceReq.getId(param)
			const data = await this.serviceOrder.findId(id)
			return Response.json(data)
		} catch (e) {
			return errorHanding(e)
		}
	}
	
	async deleteOne(req: NextRequest, param: Params) {
		let { id } = this.serviceReq.getIdInt(param)
		
		const res = await prisma.$transaction(async (tx) => {
			const transactionDB = await tx.transactionDB.delete({
				where: { id: id },
			})
			return transactionDB
		})
		return NextResponse.json({ data: res })
	}
	
	updateOne(req: NextRequest, param: Params) {
		return NextResponse.json("not implemented")
	}
	
	async addStockProduct(req: NextRequest, param: Params) {
		try {
			const user = await this.serviceReq.getUserPayload(req)
			let { data, id } = await this.serviceReq.getUpdateInt<ProductTransaction>(
				req,
				param
			)
			const res = await this.serviceProduct.addStock(data, {
				id_product: id,
				id_user: user.id,
			})
			return Response.json(res)
		} catch (e) {
			return errorHanding(e)
		}
	}
	
	async getStockProduct(req: NextRequest, param: Params) {
		try {
			const user = this.serviceReq.getUserPayload(req)
			let { id } = this.serviceReq.getIdInt(param)
			const data = await this.serviceProduct.findIdPublic(id)
			return Response.json(data)
		} catch (e) {
			return errorHanding(e)
		}
	}
	
	addTrolley(request: NextRequest, param: Params) {
		return NextResponse.json("not implemented")
	}
}

export const transactionController = new TransactionController(
	requestService,
	orderService,
	productService,
	userService,
	bankService,
	transactionService
)
