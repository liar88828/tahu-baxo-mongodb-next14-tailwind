import { beforeAll, describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ProfileModal } from "@/app/(sites)/checkout/profile/ProfileModal";

vi.mock('next/navigation', () => ({
	useRouter: vi.fn()
}));

vi.mock('next/headers', () => {
	return {
		cookies: () => {
			return {
				has: vi.fn()
			}
		}
	}
})

const testData = [{
	name: "user1",
	id: 'just for test',
	email: 'user1@gmail.com',
	emailVerified: false,
	image: 'http://example.test',
	phone: '082 1231 1231',
	address: 'jl test city',
	role: 'USER',
	createdAt: new Date(),
}]

describe('test modal checkout profile ', async () => {
	beforeAll(() => {
		HTMLDialogElement.prototype.show = vi.fn();
		HTMLDialogElement.prototype.showModal = vi.fn();
		HTMLDialogElement.prototype.close = vi.fn();
	});
	test('page checkout index page modal : success', async () => {
		render(<ProfileModal data={ testData }/>)
		await waitFor(() => {
			expect(screen.getByTestId('checkout-ProfileModal-button',)).toBeDefined()
			expect(screen.getByRole('button', { name: "Select" })).toBeDefined()
			//
			fireEvent.click(screen.getByTestId("checkout-ProfileModal-button"));
			expect(screen.getByTestId('checkout-ProfileModal-div',)).toBeDefined()
		})
	})
})