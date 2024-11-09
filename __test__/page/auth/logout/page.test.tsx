import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from "@/app/(sites)/auth/logout/page";

test.skip('page logout : success', () => {
	render(<Page/>);
	expect(screen.getByTestId('logout-Page',)).toBeDefined()
	expect(screen.getByRole('heading', { level: 1, name: "You’ve Been Logged Out" })).toBeDefined()
	//
	
})
