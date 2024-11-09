import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AddMorePhone } from "@/app/(sites)/auth/done/addMorePhone";

test('page AddMorePhone: success', () => {
	render(<AddMorePhone/>);
	expect(screen.getByTestId('done-AddMorePhone',)).toBeDefined()
	expect(screen.getByRole('heading', { level: 1, name: "Add/Verify Phone Number" })).toBeDefined()
	
})

