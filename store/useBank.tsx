import { create } from 'zustand'
import { BankData } from "@/interface/model/bank.type";
import { createJSONStorage, persist } from "zustand/middleware";

interface UseBank {
	bank: BankData | null,
	removeBank: () => void
	addBank: (bank: BankData) => void
}

export const useBank = create<UseBank>()(
	persist(
		(set) => ({
			bank: null,
			addBank: (bank: BankData) => set(prevState => ({
				...prevState, bank
			})),
			removeBank: () => set(prevState => ({
				...prevState, bank: null
			}))
			
		}),
		{
			name: 'useBank',
			storage: createJSONStorage(() => sessionStorage)
		}
	),
)