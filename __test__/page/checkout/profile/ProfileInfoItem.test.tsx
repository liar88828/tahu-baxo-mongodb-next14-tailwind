import { expect, test, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { ProfileInfoItem } from "@/app/(sites)/checkout/profile/ProfileInfoItem";
import { ReceiverDB } from "@prisma/client";

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

export const testData2: ReceiverDB = {
	name: "user1",
	phone: '082 1231 1231',
	address: 'jl test city',
	userId: "1231",
	id: 12312
}

test('page checkout index page item : success', async () => {
	render(<ProfileInfoItem
		item={ testData2 }
		fun={ () => null }
		add={ false }
	/>)
	await waitFor(() => {
		expect(screen.getByTestId('checkout-ProfileInfoItem',)).toBeDefined()
		expect(screen.getByRole('heading', { level: 1, name: testData2.name })).toBeDefined()
	})
})