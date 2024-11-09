import { expect, test } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Payment } from "@/app/(sites)/checkout/payment/Payment";

test('page checkout payment all : success', async () => {
	const Result = await Payment()
	render(Result);
	await waitFor(async () => {
		expect(screen.getByTestId('checkout-Payment',)).toBeDefined()
		expect(screen.getByRole('heading', { level: 1, name: "Payment Method" })).toBeDefined()
		// 	 payment item
		// await expect( screen.getByTestId('checkout-PaymentItem',)).toBeDefined()
		// modal
		expect(screen.getByTestId('checkout-PaymentModal-button',)).toBeDefined()
		expect(screen.getByRole('button', { name: 'Select' })).toBeDefined()
		
		fireEvent.click(screen.getByTestId("checkout-PaymentModal-div"));
		expect(screen.getByTestId('checkout-PaymentModal-div')).toBeDefined()
	});
})


