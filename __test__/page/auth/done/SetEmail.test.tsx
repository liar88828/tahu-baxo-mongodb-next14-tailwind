import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SetEmail } from "@/app/(sites)/auth/done/setEmail";

test('page set email: success', () => {
	render(<SetEmail/>);
	expect(screen.getByTestId('done-SetEmail',)).toBeDefined()
	expect(screen.getByRole('heading', { level: 1, name: "Set Backup Email" })).toBeDefined()
	
})
	
