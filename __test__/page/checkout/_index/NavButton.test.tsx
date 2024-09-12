import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { NavBottom } from "@/app/(sites)/checkout/NavBottom";

vi.mock('next/navigation', () => ({
	// useRouter: vi.fn().mockReturnThis('push')
	useRouter: vi.fn()
	// has: vi.spyOn(cookies, 'has')
}));

test('page checkout index NavBottom : success', async () => {
	const title = 'Just Text Page'
	render(<NavBottom/>)
	
	expect(screen.getByTestId('checkout-NavBottom',)).toBeDefined()
	expect(screen.getByRole('heading', { level: 1, name: "Promo" })).toBeDefined()
})