import { expect, test } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { NoteDescription } from "@/app/(sites)/checkout/product/NoteDescription";

test('page checkout payment item : success', async () => {
	render(<NoteDescription/>);
	await waitFor(() => {
		expect(screen.getByTestId('checkout-ProductNote',)).toBeDefined()
		expect(screen.getByPlaceholderText('Write a note for product ...', {})).toBeDefined()
	});
})