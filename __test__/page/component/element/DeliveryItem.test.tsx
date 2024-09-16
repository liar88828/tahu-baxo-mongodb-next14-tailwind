import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { deliveryDataList } from "@/assets/example/delivery";
import { DeliveryItem } from "@/components/elements/DeliveryItem";

test('success DeliveryItem', () => {
	render(<DeliveryItem item={ deliveryDataList[0] }/>);
	expect(screen.getByTestId('DeliveryItem',)).toBeDefined()
	expect(screen.getByRole('heading', { level: 2, name: "Delivery Details" })).toBeDefined()
	
})