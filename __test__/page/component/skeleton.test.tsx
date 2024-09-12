import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SkeletonCard, SkeletonCardLong } from "@/components/Skeleton";

describe('SkeletonCard Test', () => {
	
	test('Page skeleton card', () => {
		render(<SkeletonCard/>);
		expect(screen.getByTestId('SkeletonCard',)).toBeDefined()
	})
	test('Page skeleton card long', () => {
		render(<SkeletonCardLong/>);
		expect(screen.getByTestId('SkeletonCardLong',)).toBeDefined()
	})
	
})
