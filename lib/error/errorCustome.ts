import { errorStatus, ErrorStatus } from "@/lib/error/errorStatus";

export class ErrorTrolley extends Error {
	constructor(message: ErrorStatus) {
		super(errorStatus[message].toString());
		Object.setPrototypeOf(this, ErrorTrolley.prototype);
	}
}

export class ErrorProduct extends Error {
	constructor(message: ErrorStatus) {
		super(errorStatus[message].toString());
		Object.setPrototypeOf(this, ErrorProduct.prototype);
	}
}

export class ErrorUser extends Error {
	constructor(message: ErrorStatus) {
		super(errorStatus[message].toString());
		Object.setPrototypeOf(this, ErrorUser.prototype);
	}
}

export class ErrorAuth extends Error {
	constructor(message?: string) {
		super(message);
		Object.setPrototypeOf(this, ErrorAuth.prototype);
	}
}

export class ErrorDelivery extends Error {
	constructor(message?: string) {
		super(message);
		Object.setPrototypeOf(this, ErrorDelivery.prototype);
	}
}


