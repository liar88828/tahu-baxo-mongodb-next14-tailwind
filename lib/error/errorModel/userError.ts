import { ErrorProduct } from "@/lib/error/errorCustome";
import { errorStatus } from "@/lib/error/errorStatus";

export function userError(e: ErrorProduct) {
	if (e.code === errorStatus.notFound) {
		return Response.json(`Data User is Not found : ${ e._msg } , ${ e.message }`, { status: e.code })
	}
	
	if (e.code === errorStatus.badRequest) {
		return Response.json(`Please input correct data user : ${ e._msg } , ${ e.message }`, { status: e.code })
	}
	console.error(`hello error user : ${ e._msg } , ${ e.message }  ${ e.message }`)
	return Response.json(`Error Api User : ${ e._msg } , ${ e.message }`, { status: e.code })
}