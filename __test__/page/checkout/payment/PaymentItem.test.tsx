import { expect, test } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { PaymentItem } from "@/app/(sites)/checkout/payment/PaymentItem";
import { bankDataList } from "@/assets/example/bank";

test('page checkout payment item : success', async () => {
	const data = bankDataList[0]
	render(<PaymentItem
		item={ data }
		add={ false }
		fun={ () => {
		} }
	/>);
	await waitFor(() => {
		expect(screen.getByTestId('checkout-PaymentItem',)).toBeDefined()
		expect(screen.getByRole('heading', { level: 1, name: data.name })).toBeDefined()
	});
})