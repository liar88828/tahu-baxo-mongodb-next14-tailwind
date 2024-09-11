export const errorStatus =
	{  // 1xx: Informational
		continue: 100,           // Continue with the request
		switchingProtocols: 101, // Switching protocols
		
		// 2xx: Successful
		ok: 200,                 // Request succeeded
		created: 201,            // Resource created successfully
		accepted: 202,           // Request accepted but not yet processed
		noContent: 204,          // Request succeeded but no content returned
		
		// 3xx: Redirection
		movedPermanently: 301,   // Resource moved permanently
		found: 302,              // Resource found but temporarily moved
		notModified: 304,        // Resource not modified since last request
		
		// 4xx: Client Error
		badRequest: 400,         // Bad request syntax or invalid data
		unauthorized: 401,       // Unauthorized access
		forbidden: 403,          // Access forbidden
		notFound: 404,           // Resource not found
		conflict: 409,           // Conflict with the current state of the resource
		unprocessableEntity: 422, // Unprocessable entity (e.g., validation error)
		tooManyRequests: 429,    // Too many requests (rate limiting)
		
		// "5xx:" Server Error
		internalServerError: 500, // Generic server error
		notImplemented: 501,     // Server does not recognize method
		badGateway: 502,         // Invalid response from the upstream server
		serviceUnavailable: 503, // Service unavailable
		gatewayTimeout: 504,      // Gateway timeout
		text: 0
	}

export type ErrorStatus = keyof typeof errorStatus
const testErrorText: ErrorStatus = 'notFound'

console.log(testErrorText)
const data: Partial<ErrorStatus> = 'notFound'
