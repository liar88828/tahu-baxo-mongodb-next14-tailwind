import { render, screen } from '@testing-library/react'
import { expect, test } from "vitest";
import Rating from "@/components/elements/Rating";

test('success Rating', () => {
	render(<Rating name={ 'test-star' }/>)
	expect(screen.getByTestId('Rating',)).toBeDefined()
	
})


