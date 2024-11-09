import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { TitleSearch } from "@/components/title/TitleSearch";

vi.mock("next/navigation", () => {
	const actual = vi.importActual("next/navigation");
	return {
		...actual,
		useRouter: vi.fn(() => ({
			push: vi.fn(),
		})),
		useSearchParams: vi.fn(() => ({
			get: vi.fn(),
		})),
		usePathname: vi.fn(),
	};
});

test('success TitleSearch', () => {
	render(<TitleSearch title={ 'is title search test' }/>)
	expect(screen.getByTestId('TitleSearch',)).toBeDefined()
	expect(screen.getByText("is title search test")).toBeDefined()
	
})