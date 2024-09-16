import { create } from 'zustand'
import { DeliveryDB } from "@prisma/client";
import { createJSONStorage, persist } from "zustand/middleware";

interface UseDelivery {
	delivery: DeliveryDB | null,
	removeDelivery: () => void
	addDelivery: (delivery: DeliveryDB) => void
}

export const useDelivery = create<UseDelivery>()(
	persist(
		(set) => ({
			delivery: null,
			addDelivery: (delivery: DeliveryDB) => set(prevState => ({
				...prevState, delivery
			})),
			removeDelivery: () => set(prevState => ({
				...prevState, delivery: null
			}))
		}),
		{
			name: "useDelivery",
			storage: createJSONStorage(() => sessionStorage)
		}
	),
)