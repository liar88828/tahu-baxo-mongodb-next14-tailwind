import React from 'react'
import { render, screen } from '@testing-library/react'
import { TextArea } from "@/components/elements/Input";
import { expect, test } from "vitest";

const setup = () => {
	const utils = render(<TextArea
		title={ 'Test TextArea Label' }
		keys={ '123' }
		state={ {
			err: {
				email: ['test error input']
			},
			message: "test input"
		} }
	/>)
	const input = screen.getByLabelText('cost-textarea')
	return {
		input,
		...utils,
	}
}

test('success TextAreaDiv', () => {
	setup()
	expect(screen.getByTestId('TextAreaDiv',)).toBeDefined()
	expect(screen.getByText("Test TextArea Label")).toBeDefined()
	
})