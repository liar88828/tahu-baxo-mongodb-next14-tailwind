import { PaginationDB } from "@/server/service/product.service";
import { ReceiverDB } from "@prisma/client";
import { config } from "@/config/baseConfig";
import { errorApi } from "@/lib/error/errorApi";

export async function getAllDataReceiver(search: string) {
	try {
		
		const res = await fetch(`${ config.url }/api/penerima?search=${ search }`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			cache: "no-cache",
		})
		const code = res.status
		if (!res.ok) {
			errorApi(code, 'receiver', await res.text())
		}
		return {
			code,
			...(await res.json() as PaginationDB<ReceiverDB>)
		}
	} catch (e) {
		return null
	}
}