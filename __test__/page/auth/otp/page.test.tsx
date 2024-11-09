import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from "@/app/(sites)/auth/logout/page";

test.skip('page otp : success', () => {
	render(<Page/>);
	expect(screen.getByTestId('otp-Page',)).toBeDefined()
	expect(screen.getByRole('heading', { level: 1, name: "Enter Your OTP" })).toBeDefined()
	//
	
})
