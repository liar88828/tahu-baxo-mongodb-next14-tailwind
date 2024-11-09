import { render, screen } from '@testing-library/react'
import { expect, test } from "vitest";
import Divider from "@/components/elements/Divider";

test('success Divider', () => {
	render(<Divider title={ 'is divider test' }/>)
	expect(screen.getByTestId('Divider',)).toBeDefined()
	expect(screen.getByText("is divider test")).toBeDefined()
	
})