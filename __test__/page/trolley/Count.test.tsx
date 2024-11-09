import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProductCount } from "@/app/(sites)/trolley/ProductCount";
import { exampleTrolley } from "@/assets/example/trolley";

// vi.mock('next/navigation', () => ({
// 	useRouter: vi.fn()
// }))

test('success trolley ProductCount', () => {
	render(<ProductCount item={ exampleTrolley }/>)
	
	expect(screen.getByTestId('ProductCount',)).toBeDefined()
	expect(screen.getByRole('heading', { level: 1, name: String(exampleTrolley.qty) })).toBeDefined()
})