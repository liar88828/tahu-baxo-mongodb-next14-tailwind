import { errorStatus } from "@/lib/error/errorStatus";
import { ErrorAuth } from "@/lib/error/errorCustome";
import { FromType } from "@/interface/model/from.type";

export function errorApi(status: number, from: FromType, message: string = '') {
	console.log(message, 'message')
	if (status === errorStatus.unauthorized) {
		console.error('will redirect')
		// return redirect('/auth/login')
	}
	if (from === 'auth') {
		if (status === errorStatus.notFound) {
			// dev-check
			console.error('not found')
			throw new ErrorAuth('notFound', `${ message }`,);
		}
		if (status === errorStatus.badRequest) {
			throw new ErrorAuth('badRequest', `${ message }`,);
		}
		
		if (status === errorStatus.notFound) {
			throw new ErrorAuth('notFound', `${ message }`,);
		}
	}
	
	if (from === 'logout') {
		console.log('is error')
		if (status === errorStatus.notFound) {
			// dev-check
			console.error('not found')
			throw new ErrorAuth('notFound', `error woy`,);
		}
		if (status === errorStatus.badRequest) {
			// dev-check
			console.error('bad request')
			throw new ErrorAuth('badRequest', `the user maybe last logout`,);
			
		}
		console.log(` ${ status } : not throw `)
	}
	
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