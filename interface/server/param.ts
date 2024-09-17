export type ParamsProfile = { searchParams: { tab: string, search: string, category: string } }
export type ParamsProduct = { params: { id: number } }
export type Params = {
	params: {
		id: string
	}
}
export type InputQueryParams = 'tab' | 'category' | "search";
