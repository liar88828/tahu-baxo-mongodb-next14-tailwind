import { errorStatus, ErrorStatus } from "@/lib/error/errorStatus";

export class ErrorTrolley extends Error {
	code: number;
	_msg: string;
	
	constructor(message: ErrorStatus, _msg: string) {
		super(message);
		this.code = errorStatus[message]
		this._msg = _msg
		Object.setPrototypeOf(this, ErrorTrolley.prototype);
	}
}

export class ErrorProduct extends Error {
	code: number;
	_msg: string;
	
	constructor(message: ErrorStatus, _msg: string) {
		super(message);
		this.code = errorStatus[message]
		this._msg = _msg
		Object.setPrototypeOf(this, ErrorProduct.prototype);
	}
}

export class ErrorUser extends Error {
	code: number;
	_msg: string;
	
	constructor(message: ErrorStatus, _msg: string) {
		super(message);
		this.code = errorStatus[message]
		this._msg = _msg
		Object.setPrototypeOf(this, ErrorUser.prototype);
	}
}

export class ErrorAuth extends Error {
	code: number;
	_msg: string;
	
	constructor(message: ErrorStatus, _msg: string) {
		super(message);
		this.code = errorStatus[message]
		this._msg = _msg
		Object.setPrototypeOf(this, ErrorAuth.prototype);
	}
}

export class ErrorDelivery extends Error {
	code: number;
	_msg: string;
	
	constructor(message: ErrorStatus, _msg: string) {
		super(message);
		this.code = errorStatus[message]
		this._msg = _msg
		Object.setPrototypeOf(this, ErrorDelivery.prototype);
	}
}



