import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import NavBottom from "@/app/(sites)/trolley/NavBottom";

vi.mock('next/navigation', () => ({
	useRouter: vi.fn()
}))

test('success trolley NavBottom', () => {
	render(<NavBottom/>)
	expect(screen.getByTestId('NavBottom',)).toBeDefined()
	expect(screen.getByRole('heading', { level: 1, name: "Total" })).toBeDefined()
	
})