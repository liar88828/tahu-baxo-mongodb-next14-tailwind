import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DoneAll } from "@/app/(sites)/auth/done/doneAll";

test('page done all: success', () => {
	render(<DoneAll/>);
	expect(screen.getByTestId('done-DoneAll',)).toBeDefined()
	expect(screen.getByRole('heading', { level: 1, name: "All Done !" })).toBeDefined()
})

