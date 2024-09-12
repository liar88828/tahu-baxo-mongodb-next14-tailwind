import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from "@/app/(sites)/auth/reset/page";

test.skip('page reset : success', () => {
	render(<Page/>);
	expect(screen.getByTestId('reset-Page',)).toBeDefined()
	expect(screen.getByRole('heading', { level: 1, name: "Enter Your OTP" })).toBeDefined()
	//
	
})
