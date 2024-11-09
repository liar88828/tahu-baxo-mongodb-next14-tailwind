import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { TotalPay } from "@/app/(sites)/checkout/TotalPay";

vi.mock('next/navigation', () => ({
	useRouter: vi.fn()
}));

test('page checkout index Total page : success', async () => {
	render(<TotalPay/>)
	expect(screen.getByTestId('checkout-TotalPay',)).toBeDefined()
	expect(screen.getByRole('heading', { level: 1, name: 'Total' })).toBeDefined()
})