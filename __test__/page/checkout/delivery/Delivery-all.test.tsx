import { beforeAll, describe, expect, test, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Delivery } from "@/app/(sites)/checkout/delivery/Delivery";

describe('test modal delivery all ', async () => {
	beforeAll(() => {
		HTMLDialogElement.prototype.show = vi.fn();
		HTMLDialogElement.prototype.showModal = vi.fn();
		HTMLDialogElement.prototype.close = vi.fn();
	});
	
	test('page checkout delivery all : success', async () => {
		const Result = await Delivery()
		render(Result);
		await waitFor(() => {
			expect(screen.getByTestId('checkout-Delivery',)).toBeDefined()
			expect(screen.getByRole('heading', { level: 1, name: "Delivery Method" })).toBeDefined()
			//test desc
			expect(screen.getByTestId('checkout-DeliveryDesc',)).toBeDefined()
			expect(screen.getByRole('option', { name: "Expedition" })).toBeDefined()
			//test item
			// expect(screen.getByTestId('checkout-DeliveryItem',)).toBeDefined()
			// expect(screen.getByRole('heading', { level: 1, })).toBeDefined()
			// test modal
			expect(screen.getByTestId('checkout-DeliveryModal-button',)).toBeDefined()
			expect(screen.getByRole('button', { name: 'Select' })).toBeDefined()
			fireEvent.click(screen.getByTestId("checkout-DeliveryModal-button"));
			expect(screen.getByTestId('checkout-DeliveryModal-div')).toBeDefined()
			//
		});
	})
})

test.skip('cannot use page checkout delivery : success', async () => {
	await render(
		<Delivery/>
	);
	await waitFor(() => {
		expect(screen.getByTestId('checkout-Delivery',)).toBeDefined()
		expect(screen.getByRole('heading', { level: 1, name: "Delivery Method" })).toBeDefined()
	});
})
