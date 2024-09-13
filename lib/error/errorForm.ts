import { ZodError } from "zod";
import { ErrorAuth } from "@/lib/error/errorCustome";
import { isRedirectError } from "next/dist/client/components/redirect";

export function errorForm(err: unknown) {
	if (isRedirectError(err)) {
		throw err;
	}
	if (err instanceof ZodError) {
		//@ts-ignore
		return { err: err.flatten().fieldErrors }
	}
	if (err instanceof ErrorAuth) {
		console.error(err.message, 'client error auth get from api')
		return { message: `${ err._msg }` }
	}
	// return message
	// console.log(err, 'client error auth end')
	return { message: "unknown maybe server is busy" }
}