import { isRedirectError } from "next/dist/client/components/redirect";

export function errorGetData(err: unknown) {
	if (isRedirectError(err)) {
		throw err
	}
	if (err instanceof Error) {
		console.log(err.message)
		return null
	}
	return null
}