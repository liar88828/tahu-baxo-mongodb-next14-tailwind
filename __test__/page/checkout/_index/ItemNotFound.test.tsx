import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { ItemNotFound } from "@/app/(sites)/checkout/ItemNotFound";

test('page checkout index item is not found : success', async () => {
	const title = 'Just Text Page'
	render(<ItemNotFound
		fun={ () => {
		} }
		title={ title }/>)
	
	expect(screen.getByTestId('checkout-ItemNotFound',)).toBeDefined()
	expect(screen.getByRole('heading', { level: 1, name: title })).toBeDefined()
})