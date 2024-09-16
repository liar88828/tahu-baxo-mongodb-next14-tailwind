import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { TitleMore } from "@/components/title/TitleMore";

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

test('success TitleMore', () => {
	render(<TitleMore title={ 'is title more test' }/>)
	expect(screen.getByTestId('TitleMore',)).toBeDefined()
	expect(screen.getByText("is title more test")).toBeDefined()
	
})