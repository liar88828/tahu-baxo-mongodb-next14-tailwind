import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SetUpFace } from "@/app/(sites)/auth/done/setUpFace";

test('page SetUpFace: success', () => {
	render(<SetUpFace/>);
	expect(screen.getByTestId('done-SetUpFace',)).toBeDefined()
	expect(screen.getByRole('heading', { level: 1, name: "Set Up Face ID" })).toBeDefined()
	
})

