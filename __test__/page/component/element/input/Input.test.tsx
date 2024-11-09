import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { Input } from "@/components/elements/Input";

describe('can test input', () => {
	
	test('Page Input', () => {
		render(<Input
			title={ 'Test Input Label' }
			type={ 'email' }
			keys={ '123' }
			state={ {
				err: {
					email: ['test error input']
				},
				message: "test input"
			} }
		/>);
		expect(screen.getByTestId('InputDiv',)).toBeDefined()
		expect(screen.getByText("Test Input Label")).toBeDefined()
	})
})
