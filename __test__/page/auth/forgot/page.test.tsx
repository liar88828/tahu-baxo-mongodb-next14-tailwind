import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from "@/app/(sites)/auth/forgot/page";

test.skip('page forgot : success', () => {
	render(<Page/>);
	expect(screen.getByTestId('forgot-Page',)).toBeDefined()
	expect(screen.getByRole('heading', { level: 1, name: "Forgot Your Password?" })).toBeDefined()
	//
	
})
