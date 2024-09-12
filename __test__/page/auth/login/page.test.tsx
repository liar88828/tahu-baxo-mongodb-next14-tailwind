import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from "@/app/(sites)/auth/login/page";

test.skip('page login : success', () => {
	render(<Page/>);
	expect(screen.getByTestId('login-Page',)).toBeDefined()
	expect(screen.getByRole('heading', { level: 1, name: "Welcome Back!" })).toBeDefined()
	//
	
})
