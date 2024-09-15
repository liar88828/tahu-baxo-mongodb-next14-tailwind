export const toDate = (date: Date): string => {
	return new Date(date).toLocaleString("id-ID", {
		dateStyle: "long",
	}).toString()
}

