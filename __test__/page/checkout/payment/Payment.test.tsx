import { expect, test } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { Payment } from "@/app/(sites)/checkout/payment/Payment";

test('page checkout payment : success', async () => {
	const Result = await Payment()
	render(Result);
	await waitFor(() => {
		expect(screen.getByTestId('checkout-Payment',)).toBeDefined()
		expect(screen.getByRole('heading', { level: 1, name: "Payment Method" })).toBeDefined()
	});
})
