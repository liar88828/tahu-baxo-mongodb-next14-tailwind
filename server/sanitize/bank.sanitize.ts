export const bankSanitize = <T>(formData: FormData, userId: string): T => {
	// @ts-expect-error
	return {
		name: formData.get('name') ?? '',
		type: formData.get('type') ?? '',
		location: formData.get('location') ?? '',
		desc: formData.get('desc') ?? '',
		no_req: formData.get('no_req'),
		phone: formData.get('no_req'),
		userId,
	}
}

