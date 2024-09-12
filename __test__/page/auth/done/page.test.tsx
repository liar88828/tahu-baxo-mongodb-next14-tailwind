import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from "@/app/(sites)/auth/done/page";

test('page done : success', () => {
	render(<Page/>);
	expect(screen.getByTestId('done-Page',)).toBeDefined()
	//
	expect(screen.getByTestId('done-AddMorePhone',)).toBeDefined()
	expect(screen.getByRole('heading', { level: 1, name: "Add/Verify Phone Number" })).toBeDefined()
	//
	expect(screen.getByTestId('done-SetEmail',)).toBeDefined()
	expect(screen.getByRole('heading', { level: 1, name: "Set Backup Email" })).toBeDefined()
	//
	expect(screen.getByTestId('done-DoneAll',)).toBeDefined()
	expect(screen.getByRole('heading', { level: 1, name: "All Done !" })).toBeDefined()
	//
	expect(screen.getByTestId('done-AddMorePhone',)).toBeDefined()
	expect(screen.getByRole('heading', { level: 1, name: "Add/Verify Phone Number" })).toBeDefined()
	//
	expect(screen.getByTestId('done-SetUpFace',)).toBeDefined()
	expect(screen.getByRole('heading', { level: 1, name: "Set Up Face ID" })).toBeDefined()
})
