export type ParamsClient = {
	params: { id: string }
	searchParams: { tab: string, search: string, category: string }
}
export type Params = {
	params: {
		id: string
	}
}
export type InputQueryParams = 'tab' | 'category' | "search";
