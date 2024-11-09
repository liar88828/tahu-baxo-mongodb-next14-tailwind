import { beforeAll, describe, expect, test, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { deliveryDataList } from "@/assets/example/delivery";
import { DeliveryModal } from "@/app/(sites)/checkout/delivery/DeliveryModal";

describe('test modal checkout delivery ', async () => {
	beforeAll(() => {
		HTMLDialogElement.prototype.show = vi.fn();
		HTMLDialogElement.prototype.showModal = vi.fn();
		HTMLDialogElement.prototype.close = vi.fn();
	});
	test('page checkout delivery modal : success', async () => {
		render(<DeliveryModal data={ deliveryDataList }/>);
		await waitFor(() => {
			expect(screen.getByTestId('checkout-DeliveryModal-button',)).toBeDefined()
			expect(screen.getByRole('button', { name: 'Select' })).toBeDefined()
			// expect(screen.getByRole('dialog', { name: 'Select' })).not.toBeDefined()
			
			fireEvent.click(screen.getByTestId("checkout-DeliveryModal-button"));
			expect(screen.getByTestId('checkout-DeliveryModal-div')).toBeDefined()
			// expect(screen.getByRole('heading', { level: 3, name: 'Select User' })).toBeDefined()
		});
	})
	
})
