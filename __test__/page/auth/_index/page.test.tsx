import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from "@/app/(sites)/auth/page";

test('page auth : success', () => {
	render(<Page/>);
	expect(screen.getByTestId('auth-Page',)).toBeDefined()
	expect(screen.getByRole('heading', { level: 1, name: "Welcome to My Website!" })).toBeDefined()
	//
	
})
