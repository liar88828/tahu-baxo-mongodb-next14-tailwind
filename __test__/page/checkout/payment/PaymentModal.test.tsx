import { expect, test } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { bankDataList } from "@/assets/example/bank";
import { PaymentModal } from "@/app/(sites)/checkout/payment/PaymentModal";

test('page checkout payment modal: success', async () => {
	render(<PaymentModal data={ bankDataList }/>)
	await waitFor(() => {
		expect(screen.getByTestId('checkout-PaymentModal-button',)).toBeDefined()
		expect(screen.getByRole('button', { name: 'Select' })).toBeDefined()
		
		fireEvent.click(screen.getByTestId("checkout-PaymentModal-div"));
		expect(screen.getByTestId('checkout-PaymentModal-div')).toBeDefined()
		// expect(screen.getByRole('heading', { level: 3, name: "Select Payment" })).toBeDefined()
		
	});
})