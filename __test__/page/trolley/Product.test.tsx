import { expect, test } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { Product } from "@/app/(sites)/trolley/Product";

// vi.mock('next/navigation', () => ({
// 	useRouter: vi.fn()
// }))

test('success trolley Product', async () => {
	const Component = await Product()
	render(Component)
	
	await waitFor(() => {
		expect(screen.getByTestId('Product',)).toBeDefined()
		expect(screen.getByRole('heading', { level: 1, name: "Product List" })).toBeDefined()
		
	})
})