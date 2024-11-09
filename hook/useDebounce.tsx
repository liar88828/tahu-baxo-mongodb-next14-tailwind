import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number = 1000, isValue = true) {
	const [useDebounce, setUseDebounce] = useState<T>(value)
	useEffect(() => {
		const timeOut = setTimeout(() => setUseDebounce(value), delay)
		return () => clearTimeout(timeOut)
	}, [value, delay])
	
	return useDebounce
	
}