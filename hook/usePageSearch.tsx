'use client'
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const usePageSearch = () => {
	let path = ''
	let tab: string | null = null
	let category: string | null = null
	const router = useRouter();
	const pathname = usePathname();
	// const params = useParams()
	const searchParams = useSearchParams();
	const addQueryParam = (key: 'tab' | 'category', value: string | null) => {
		
		if (key === 'tab') {
			tab = value
			category = searchParams.get('category')
		}
		
		if (key === 'category') {
			category = value
			tab = searchParams.get('tab')
			
		}
		path = `${ pathname }?tab=${ tab }&category=${ category }`;
		router.push(path);
	};
	
	const updateQueryParams = (key: 'tab' | 'category' | "search", value: string | null) => {
		const params = new URLSearchParams(searchParams.toString());
		
		if (value) {
			params.set(key, value);
		} else {
			params.delete(key);
		}
		
		router.push(`${ pathname }?${ params.toString() }`);
	};
	return { addQueryParam, updateQueryParams }
}

