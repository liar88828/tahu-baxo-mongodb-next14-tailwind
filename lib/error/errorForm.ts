import { ZodError } from "zod";
import { ErrorAuth } from "@/lib/error/errorCustome";

export function errorForm(err: unknown) {
	
	if (err instanceof ZodError) {
		//@ts-ignore
		return { err: err.flatten().fieldErrors }
	}
	if (err instanceof ErrorAuth) {
		console.error(err.message, 'client error auth get from api')
		return { message: `${ err.message } : ${ err._msg }` }
	}
	
	// console.log(err, 'client error auth end')
	return { message: "unknown maybe server is busy" }
}