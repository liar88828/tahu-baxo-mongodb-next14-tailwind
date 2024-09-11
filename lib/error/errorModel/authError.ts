import { ErrorAuth } from "@/lib/error/errorCustome";
import { errorStatus } from "@/lib/error/errorStatus";

export function authError(e: ErrorAuth) {
	console.error('ErrorAuth-server', e.code)
	console.error('ErrorAuth-server', e.message)
	
	if (e.code == errorStatus.notFound) {
		return Response.json(`${ e._msg } :${ e.message }`, { status: e.code })
	}
	if (e.code == errorStatus.badRequest) {
		return Response.json(`${ e._msg } :${ e.message }`, { status: e.code })
	}
	console.error(`hello error auth : ${ e._msg } , ${ e.message }  ${ e.message }`)
	
	return Response.json(e.message, { status: e.code })
}