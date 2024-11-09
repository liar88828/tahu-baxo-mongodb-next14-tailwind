import { config } from "@/config/baseConfig";

export async function fetchApi({ to, token, data, method, }: {
	to: string,
	method: string,
	token?: string,
	data?: object
}) {
	
	const headers: HeadersInit = {
		'Content-Type': 'application/json',
	};
	if (token) {
		headers["Authorization"] = `Bearer ${ token }`;
	}
	const options: RequestInit = {
		method,
		headers,
	};
	
	if (data) {
		options.body = JSON.stringify(data);
	}
	
	return fetch(`${ config.url }${ to }`,
		{
			...options,
			cache: 'no-cache',
		})
	
}