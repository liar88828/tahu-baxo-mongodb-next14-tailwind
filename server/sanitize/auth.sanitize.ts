export const loginSanitize = (formData: FormData,) => {
	return {
		email: formData.get('email'),
		password: formData.get('password'),
	}
}

export const forgetSanitize = (formData: FormData,) => {
	return {
		email: formData.get('email'),
	}
}

export const resetSanitize = (formData: FormData,) => {
	return {
		password: formData.get('password'),
		confPass: formData.get('confPass'),
	}
}

