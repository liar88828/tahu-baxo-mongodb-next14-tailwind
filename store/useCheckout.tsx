import { create } from 'zustand'
import { createJSONStorage, persist } from "zustand/middleware";

export type DescriptionCheckout = {
	note: string,
	distance: string,
	packing: string,
	shippingCost: number,
	subTotal: number
	totalPrice: number
}

export interface UseCheckout {
	description: DescriptionCheckout
	setChange: (item: Partial<DescriptionCheckout>) => void
	setPrice: (value: Pick<DescriptionCheckout, 'shippingCost'>) => void
	totalPay: (totalTrolley: number) => void
}

export const useCheckout = create<UseCheckout>()(
	persist(
		(set) => ({
			description: {
				note: '',
				distance: "",
				packing: "",
				shippingCost: 0,
				totalPrice: 0,
				subTotal: 0
			},
			
			setChange: (value: Partial<DescriptionCheckout>) => {
				set(prevState => ({
					...prevState,
					description: { ...prevState.description, ...value }
				}))
			},
			
			setPrice: (value: Pick<DescriptionCheckout, 'shippingCost'>) =>
				set(prevState => ({
					...prevState,
					description: {
						...prevState.description,
						shippingCost: value.shippingCost,
					}
					// shippingCost: prevState.description.shippingCost = value.shippingCost
				})),
			
			totalPay: (totalTrolley: number) => {
				set(prevState => ({
					...prevState,
					// description: {
					// 	...prevState.description,
					// 	totalPrice: totalTrolley + prevState.description.shippingCost
					// }
					subtotal: prevState.description.subTotal = totalTrolley,
					totalPrice: prevState.description.totalPrice = prevState.description.shippingCost + totalTrolley,
					// description: {
					// 	...prevState.description,
					// 	totalPrice: prevState.description.shippingCost + totalTrolley
					// }
				}))
			}
			
		}),
		{
			name: 'useCheckout',
			storage: createJSONStorage(() => sessionStorage)
		}
	)
)
