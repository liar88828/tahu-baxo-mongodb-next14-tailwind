import { render, screen } from '@testing-library/react'
import { expect, test } from "vitest";
import { EmptyComponent } from "@/components/error/EmptyComponent";

test('success EmptyComponent', () => {
	render(<EmptyComponent title={ 'is empty component test' }/>)
	expect(screen.getByTestId('EmptyComponent',)).toBeDefined()
	expect(screen.getByText("is empty component test")).toBeDefined()
	
})