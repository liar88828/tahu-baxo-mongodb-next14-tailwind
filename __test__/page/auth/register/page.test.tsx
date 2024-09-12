import { expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from "@/app/(sites)/auth/register/page";

vi.mock('react-dom', () => ({
	useFormState: vi.fn(),
	// useFormStatus: vi.fn(),
}));

test.skip('page register : success', () => {
	render(<Page/>);
	expect(screen.getByTestId('register-Page',)).toBeDefined()
	expect(screen.getByRole('heading', { level: 1, name: "Create Your Account" })).toBeDefined()
	//
	
})
