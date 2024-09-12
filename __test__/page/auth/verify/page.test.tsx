import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from "@/app/(sites)/auth/verify/page";

test.skip('page verify : success', () => {
	render(<Page/>);
	expect(screen.getByTestId('verify-Page',)).toBeDefined()
	expect(screen.getByRole('heading', { level: 1, name: "Verify Your Email Address" })).toBeDefined()
	//
	
})
