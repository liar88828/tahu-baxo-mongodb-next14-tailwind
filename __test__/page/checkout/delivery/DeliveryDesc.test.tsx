import { expect, test } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { DeliveryDesc } from "@/app/(sites)/checkout/delivery/DeliveryDesc";

test('page checkout delivery Desc : success', async () => {
	render(<DeliveryDesc/>);
	await waitFor(() => {
		expect(screen.getByTestId('checkout-DeliveryDesc',)).toBeDefined()
		expect(screen.getByRole('option', { name: "Expedition" })).toBeDefined()
	});
})

