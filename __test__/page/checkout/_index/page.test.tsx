import { expect, test } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import Page from "@/app/(sites)/checkout/page";

// vi.mock('next/navigation', () => ({
// 	useRouter: vi.fn()
// }));
//
// vi.mock('next/headers', () => {
// 	return {
// 		cookies: () => {
// 			return {
// 				has: vi.fn()
// 			}
// 		}
// 	}
// })

test.skip('page checkout _index page : success', async () => {
	const Component = await Page()
	render(Component)
	await waitFor(() => {
		expect(screen.getByTestId('checkout-page',)).toBeDefined()
	})
})