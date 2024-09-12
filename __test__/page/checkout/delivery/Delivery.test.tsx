import { expect, test } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { Delivery } from "@/app/(sites)/checkout/delivery/Delivery";

test('page checkout delivery : success', async () => {
	const Result = await Delivery()
	render(Result);
	await waitFor(() => {
		expect(screen.getByTestId('checkout-Delivery',)).toBeDefined()
		expect(screen.getByRole('heading', { level: 1, name: "Delivery Method" })).toBeDefined()
	});
})
