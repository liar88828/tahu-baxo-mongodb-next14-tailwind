import { expect, test } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { DeliveryItem } from "@/app/(sites)/checkout/delivery/DeliveryItem";
import { deliveryDataList } from "@/assets/example/delivery";

test('page checkout delivery item : success', async () => {
	const data = deliveryDataList[0]
	render(<DeliveryItem
		item={ data }
		add={ false }
		fun={ () => {
		} }/>);
	await waitFor(() => {
		expect(screen.getByTestId('checkout-DeliveryItem',)).toBeDefined()
		expect(screen.getByRole('heading', { level: 1, name: data.name })).toBeDefined()
	});
})

