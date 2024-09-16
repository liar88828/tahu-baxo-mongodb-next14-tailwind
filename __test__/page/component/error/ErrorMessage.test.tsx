import { render, screen } from '@testing-library/react'
import { expect, test } from "vitest";
import { ErrorMessage } from "@/components/error/errorMessage";

test('success ErrorMessage', () => {
	render(<ErrorMessage state={ 'test error message' }/>)
	expect(screen.getByTestId('ErrorMessage',)).toBeDefined()
	expect(screen.getByText("test error message")).toBeDefined()
	
})