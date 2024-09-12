import { beforeAll, describe, expect, test, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { ProductList } from "@/app/(sites)/checkout/product/ProductList";
import { getTrolleyPrivate } from "@/server/action/trolley.action";
//
// vi.mock('next/headers', () => ({
// cookies: vi.fn().mockReturnThis()
// 	// has: vi.spyOn(cookies, 'has')
// }));

// vi.mock('@/server/action/trolley.action', () => ({
// 	getTrolleyPrivate: vi.fn().mockReturnThis('map')
// 	// has: vi.spyOn(cookies, 'has')
// }));

describe.skip('test checkout Product list', async () => {
	const useMoviesSpy = await vi.fn(getTrolleyPrivate);
	// 	const getSpy = vi.spyOn(cookies(), 'has')//.mockReturnValueOnce({''});
	beforeAll(() => {
		
		// HTMLDialogElement.prototype.show = vi.fn();
		// HTMLDialogElement.prototype.showModal = vi.fn();
		// HTMLDialogElement.prototype.close = vi.fn();
		
	});
	test('page checkout product list : success', async () => {
		const Result = await ProductList()
		render(Result);
		await waitFor(() => {
			expect(screen.getByTestId('checkout-ProductList',)).toBeDefined()
			expect(screen.getByRole('heading', { level: 1, name: "Product List" })).toBeDefined()
		});
	})
})
