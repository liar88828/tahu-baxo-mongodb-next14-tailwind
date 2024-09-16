import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SkeletonCard, SkeletonCardHorizontal, SkeletonCardLong } from "@/components/loading/Skeleton";

describe('Skeleton Component', () => {
	
	test('Page SkeletonCard', () => {
		render(<SkeletonCard/>);
		expect(screen.getByTestId('SkeletonCard',)).toBeDefined()
	})
	
	test('Page SkeletonCardLong', () => {
		render(<SkeletonCardLong/>);
		expect(screen.getByTestId('SkeletonCardLong',)).toBeDefined()
	})
	
	test('Page SkeletonCardHorizontal', () => {
		render(<SkeletonCardHorizontal/>);
		expect(screen.getByTestId('SkeletonCardHorizontal',)).toBeDefined()
	})
})
