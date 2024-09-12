import { expect, test, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { ProfileInfoItem } from "@/app/(sites)/checkout/profile/ProfileInfoItem";

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
type UserPublic = {
	name: string;
	id: string;
	email: string;
	emailVerified: boolean;
	image: string | null;
	phone: string;
	address: string;
	role: string;
	createdAt: Date;
}

const testData = {
	name: "user1",
	id: 'just for test',
	email: 'user1@gmail.com',
	emailVerified: false,
	image: 'http://example.test',
	phone: '082 1231 1231',
	address: 'jl test city',
	role: 'USER',
	createdAt: new Date(),
}

test('page checkout index page item : success', async () => {
	render(<ProfileInfoItem
		item={ testData }
		fun={ () => {
		} }
		add={ false }
	/>)
	await waitFor(() => {
		expect(screen.getByTestId('checkout-ProfileInfoItem',)).toBeDefined()
		expect(screen.getByRole('heading', { level: 1, name: testData.name })).toBeDefined()
	})
})