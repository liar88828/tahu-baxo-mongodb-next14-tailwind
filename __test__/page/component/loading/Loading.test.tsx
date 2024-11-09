import { render, screen } from '@testing-library/react'
import { expect, test } from "vitest";
import { Loading, LoadingBounce } from "@/components/loading/loading";

test('success Loading', () => {
	render(<Loading/>)
	expect(screen.getByTestId('Loading')).toBeDefined()
})

test('success LoadingBounce', () => {
	render(<LoadingBounce/>)
	expect(screen.getByTestId('LoadingBounce')).toBeDefined()
})