import { ErrorProduct } from "@/lib/error/errorCustome";
import { errorStatus } from "@/lib/error/errorStatus";

export function productError(e: ErrorProduct) {
	if (e.code == errorStatus.notFound) {
		return Response.json(`Data Product is Not found : ${ e._msg } , ${ e.message }`, { status: e.code })
	}
	
	if (e.code == errorStatus.badRequest) {
		return Response.json(`Please input correct data : ${ e._msg } , ${ e.message }`, { status: e.code })
	}
	console.error(`hello error product : ${ e._msg } , ${ e.message }  ${ e.message }`)
	return Response.json(`Error Api Product : ${ e._msg } , ${ e.message }`, { status: e.code })
	
}