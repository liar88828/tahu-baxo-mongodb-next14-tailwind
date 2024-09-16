import { expect, test } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { Description } from "@/app/(sites)/checkout/Description";

test('page checkout delivery Desc : success', async () => {
	render(<Description/>);
	await waitFor(() => {
		expect(screen.getByTestId('checkout-DeliveryDesc',)).toBeDefined()
		expect(screen.getByRole('option', { name: "Expedition" })).toBeDefined()
	});
})

