import React, { useState } from 'react';

function usePhone(value: string = '') {
	const [state, setState] = useState(value)
	const setPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
		// const value = e.target.value.replace(/\D/g, ""); // Remove all non-digit characters
		// const formattedValue = value
		// 	.replace(/(\d{3})(\d{4})(\d{4})(\d{4})/, "($1) $2 $3 $4") // Format as (xxx) xxxx xxxx xxxx
		// 	// .slice(0, 19); // Limit to 19 characters to match (xxx) xxxx xxxx xxxx
		//
		
		let value = e.target.value.replace(/\D/g, ""); // Remove all non-digit characters
		
		// Break down the number and format in parts
		if (value.length > 3) {
			value = `(${ value.slice(0, 3) }) ` + value.slice(3);
		}
		if (value.length > 8) {
			value = value.slice(0, 9) + " " + value.slice(9);
		}
		if (value.length > 13) {
			value = value.slice(0, 14) + " " + value.slice(14);
		}
		if (value.length > 18) {
			value = value.slice(0, 19); // Limit to maximum length of the format
		}
		
		setState(value);
	}
	return { setPhone, phone: state, onReset: () => setState('') };
}

export default usePhone;