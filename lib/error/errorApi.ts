import { errorStatus } from "@/lib/error/errorStatus";
import { ErrorAuth } from "@/lib/error/errorCustome";
import { FromType } from "@/interface/model/from.type";

export function errorApi(status: number, from: FromType, message: string = '') {
	if (status === errorStatus.notFound) {
		console.error('error not found')
		throw new ErrorAuth('notFound', `${ from } data is not found`,);
	}
	
	if (status === errorStatus.badRequest) {
		console.error('error bad request')
		throw new ErrorAuth('badRequest', `${ from } data is not valid`,);
	}
	if (status === errorStatus.unprocessableEntity) {
		console.error('error un processableEntity')
		throw new ErrorAuth('unprocessableEntity', `${ from } sorry data is not processed`,);
	}
	console.error('error api auth ')
	throw new ErrorAuth('serviceUnavailable', `${ message } api ${ from } is error`,);
}