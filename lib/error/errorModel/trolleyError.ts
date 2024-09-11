import { errorStatus } from "@/lib/error/errorStatus";
import { ErrorTrolley } from "@/lib/error/errorCustome";

export function trolleyError(e: ErrorTrolley) {
	if (e.code === errorStatus.notFound) {
		return Response.json(`Data Trolley is Not found : ${ e._msg } , ${ e.message }`, { status: e.code })
	}
	if (e.code === errorStatus.conflict) {
		return Response.json(`Data Trolley is so maximum to add. please delete another trolley item for expand : ${ e._msg } , ${ e.message }`, { status: e.code })
	}
	console.error(`hello error trolley : ${ e._msg } , ${ e.message }  ${ e.message }`)
	return Response.json(`Error Api Trolley : ${ e._msg } , ${ e.message }`, { status: e.code })
}