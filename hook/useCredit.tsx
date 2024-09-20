import React, { useState } from "react";

function useCredit(value: string = '') {
	const [state, setState] = useState(value)
	const setCredit = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.replace(/\D/g, ""); // Remove all non-digit characters
		const formattedValue = value
			.replace(/(.{4})/g, "$1 ") // Insert space every 4 digits
			.trim(); // Remove trailing space
		setState(formattedValue);
	}
	return { credit: state, setCredit };
}

export default useCredit;