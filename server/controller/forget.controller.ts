import { requestService, RequestService, } from "@/server/service/request.service"
import { userService, UserService } from "@/server/service/user.service"
import { NextRequest, NextResponse } from "next/server"
import { errorHanding } from "@/lib/error/errorHanding"
import { OtpSchema, OtpService } from "@/server/service/auth/otp.service"
import { EmailService } from "@/server/service/email.service"
import { NewPassword } from "@/interface/model/auth.type"
import prisma from "@/config/prisma"

class ForgetController {
	constructor(
		private serviceRequest: RequestService,
		private serviceUser: UserService,
		private serviceOtp: OtpService,
		private serviceEmail: EmailService
	) {
	}
	
	// forgot
	async forgot(req: NextRequest) {
		//send forget to email or phone
	}
	
	async validOtp(req: NextRequest) {
		try {
			const { data } = await this.serviceRequest.getData<OtpSchema>(req)
			const userDb = await this.serviceUser.findEmailOnly(data)
			this.serviceOtp.validOtp(data.otp, userDb.email)
		} catch (e) {
			errorHanding(e)
		}
	}
	
	getOtp(req: NextRequest) {
		try {
			const data = this.serviceOtp.generate()
			return Response.json(data)
		} catch (e) {
			errorHanding(e)
		}
		
	}
	
	getAgain(req: NextRequest) {
		throw new Error("not implemented")
	}
	
	sendEmail(req: NextRequest) {
		try {
			const data = this.serviceOtp.sendEmail()
			return Response.json(data)
		} catch (e) {
			errorHanding(e)
		}
	}
	
	async newPassword(req: NextRequest) {
		try {
			const { data } = await this.serviceRequest.getData<NewPassword>(req)
			this.serviceUser.validPassword(data)
			const res = await this.serviceUser.newPassword(data)
			return Response.json(res)
		} catch (e: unknown) {
			return errorHanding(e)
		}
	}
	
	async remove(req: NextRequest) {
		try {
			const user = await this.serviceRequest.getUserPayload(req)
			const userDB = await prisma.$transaction(async (tx) => {
				const userDB = await tx.user.delete({
					where: {
						name: user.name,
						email: user.email,
					},
				})
				console.log("---------success delete ------")
				return userDB
			})
			
			return NextResponse.json({ data: userDB, msg: "success delete" })
		} catch (e: unknown) {
			return errorHanding(e)
		}
	}
}

export const forgetController = new ForgetController(
	requestService,
	userService,
	new OtpService(),
	new EmailService()
)
