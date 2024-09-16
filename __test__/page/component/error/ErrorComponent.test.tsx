import { render, screen } from '@testing-library/react'
import { expect, test } from "vitest";
import ErrorComponent from "@/components/error/ErrorComponent";

test('success ErrorComponent', () => {
	render(<ErrorComponent title={ 'is error component test' }/>)
	expect(screen.getByTestId('ErrorComponent',)).toBeDefined()
	expect(screen.getByText("is error component test")).toBeDefined()
	
})