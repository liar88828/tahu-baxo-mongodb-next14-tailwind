import { beforeEach, describe, expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from "@/app/(sites)/auth/login/page";

describe.skip('can mock login page', () => {
	beforeEach(() => {
		vi.mock('react-dom', () => ({
			useFormState: vi.fn(),
			useFormStatus: vi.fn(),
		}));
	})
	
	test('page login : success', async () => {
	render(<Page/>);
	expect(screen.getByTestId('login-Page',)).toBeDefined()
	expect(screen.getByRole('heading', { level: 1, name: "Welcome Back!" })).toBeDefined()
	//
	
})
})
