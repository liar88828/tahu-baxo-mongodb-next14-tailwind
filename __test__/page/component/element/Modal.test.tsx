import { render, screen } from '@testing-library/react'
import { expect, test } from "vitest";
import Modal from "@/components/elements/modal";

test('success Modal', () => {
	render(<Modal keys={ 'test_modal' } classNames={ '' }
								buttonText={ 'test button' }>
		hello
	</Modal>)
	expect(screen.getByTestId('Modal',)).toBeDefined()
	expect(screen.getByText("hello")).toBeDefined()
	expect(screen.getByText("test button")).toBeDefined()
	
})


