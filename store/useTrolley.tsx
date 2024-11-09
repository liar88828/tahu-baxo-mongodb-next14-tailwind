import { create } from "zustand"
import { GetAllTrolleyContext } from "@/interface/model/trolley.type"
import { createJSONStorage, persist } from "zustand/middleware"
import { TrolleyDB } from "@prisma/client";

interface UseTrolley {
	trolley: GetAllTrolleyContext[]
	removeTrolleyMany: (trolleyId: number) => void
	addTrolleyMany: (trolley: GetAllTrolleyContext) => void
	contextIncrementTrolley: (add: number, item: TrolleyDB) => void,
	foundTrolley: (item: TrolleyDB) => boolean
	increment: (item: TrolleyDB) => void
	decrement: (item: TrolleyDB) => void
	totalTrolley: () => number,
	resetTrolley: () => void
}

const initialState = {
	trolley: [],
}

export const useTrolley = create<UseTrolley>()(
	persist(
		(set, get) => ({
			...initialState,
			resetTrolley: () => {
				set(initialState)
			},
			
			foundTrolley: (item: TrolleyDB) => {
				return get().trolley.some(t => t.id === item.id)
			},
			
			totalTrolley: () => {
				return get().trolley.reduce((a, b) => a + b.Product.price * b.qty, 0)
			},
			
			addTrolleyMany: (trolley: GetAllTrolleyContext) =>
				set((prevState) => ({
					trolley: [...prevState.trolley, trolley],
				})),
			
			removeTrolleyMany: (trolleyId: number) =>
				set((prevState) => ({
					trolley: prevState.trolley.filter((t) => t.id !== trolleyId),
				})),
			
			increment: (item: TrolleyDB) => {
				set((prevState => ({
					...prevState,
					trolley: prevState.trolley.map(t =>
						t.id === item.id
							? {
								...t,
								qty: t.qty + 1
							} : t
					)
				})))
			},
			decrement: (item: TrolleyDB) => {
				set((prevState => ({
					...prevState,
					trolley: prevState.trolley.map(t =>
						t.id === item.id
							? {
								...t,
								qty: t.qty - 1
							} : t
					)
				})))
			},
			contextIncrementTrolley: (add: number, item: TrolleyDB) => {
				set(
					(prevState => ({
						...prevState,
						trolley: prevState.trolley
							.map(trolleyItem =>
								trolleyItem.id === item.id
									? {
										...trolleyItem,
										// qty: trolleyItem.qty + add
										qty: add
									}
									: trolleyItem
							),
					})))
			},
			
		}),
		{
			name: "useTrolley",
			storage: createJSONStorage(() => sessionStorage),
		}
	)
)
