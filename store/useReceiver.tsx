'use client'
import { create } from 'zustand'
import { ReceiverDB } from "@prisma/client";
import { createJSONStorage, persist } from "zustand/middleware";

export interface UseReceiver {
	receiver: ReceiverDB | null,
	removeReceiver: () => void
	addReceiver: (user: ReceiverDB) => void
}

export const useReceiver = create<UseReceiver>()(
	persist((set) => ({
			receiver: null,
			addReceiver: (receiver: ReceiverDB) => set(prevState => ({
				...prevState, receiver: receiver
			})),
			removeReceiver: () => set(prevState => ({
				...prevState, receiver: null
			}))
		}),
		{
			name: "useReceiver",
			storage: createJSONStorage(() => sessionStorage)
		}
	)
)
