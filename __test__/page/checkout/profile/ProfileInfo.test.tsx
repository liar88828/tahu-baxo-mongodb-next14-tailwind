import { expect, test, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import ProfileInfo from "@/app/(sites)/checkout/profile/ProfileInfo";

vi.mock('next/navigation', () => ({
	useRouter: vi.fn()
}));

vi.mock('next/headers', () => {
	return {
		cookies: () => {
			return {
				has: vi.fn()
			}
		}
	}
})

test('page checkout index page info : success', async () => {
	const Component = await ProfileInfo()
	render(Component)
	await waitFor(() => {
		expect(screen.getByTestId('checkout-ProfileInfo',)).toBeDefined()
		expect(screen.getByRole('heading', { level: 1, name: 'User Information' })).toBeDefined()
	})
})