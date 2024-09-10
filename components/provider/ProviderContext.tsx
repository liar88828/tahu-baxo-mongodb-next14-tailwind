'use client'
import React, { createContext, ReactNode, useState } from 'react';
import { UserPublic } from "@/interface/user/UserPublic";
import { BankDB, DeliveryDB, TrolleyDB } from "@prisma/client";

export type TCheckoutContext = {
	user: UserPublic | null,
	trolley: TrolleyDB | null,
	bank: BankDB | null
	delivery: DeliveryDB | null
	// productId: number,
	// productName: string,
	// bankId:number,
	
}
export type TProviderCheckout = {
	state: TCheckoutContext
	reduce: React.Dispatch<React.SetStateAction<TCheckoutContext>>
	removeUser: () => void
	addUser: (user: UserPublic) => void
	removeTrolley: () => void
	addTrolley: (trolley: TrolleyDB) => void
	removeBank: () => void
	addBank: (bank: BankDB) => void
	removeDelivery: () => void
	addDelivery: (delivery: DeliveryDB) => void
}
const initialState: TCheckoutContext = {
	user: null,
	trolley: null,
	bank: null,
	delivery: null
}
export const ContextTrolley = createContext<TProviderCheckout>(
	{
		state: initialState,
		reduce: () => {
		},
		removeUser: () => {
		},
		addUser: () => {
		},
		addTrolley: () => {
		},
		removeTrolley: () => {
		},
		addBank: () => {
		},
		removeBank: () => {
		},
		addDelivery: () => {
		},
		removeDelivery: () => {
		}
	});

export default function ProviderContext({ children }: { children: ReactNode }) {
	// is access token
	const [checkout, setCheckout] = useState<TCheckoutContext>(initialState);
	
	const addUser = (user: UserPublic) => setCheckout(prevState => ({
		...prevState, user
	}))
	
	const removeUser = () => setCheckout(prevState => ({
		...prevState, user: null
	}))
	
	const addTrolley = (trolley: TrolleyDB) => setCheckout(prevState => ({
		...prevState, trolley
	}))
	const removeTrolley = () => setCheckout(prevState => ({
		...prevState, trolley: null
	}))
	const addBank = (bank: BankDB) => setCheckout(prevState => ({
		...prevState, bank
	}))
	const removeBank = () => setCheckout(prevState => ({
		...prevState, bank: null
	}))
	const addDelivery = (delivery: DeliveryDB) => setCheckout(prevState => ({
		...prevState, delivery
	}))
	const removeDelivery = () => setCheckout(prevState => ({
		...prevState, delivery: null
	}))
	
	return (
		<ContextTrolley.Provider value={ {
			state: checkout, reduce: setCheckout,
			addUser,
			removeUser,
			addTrolley,
			removeTrolley,
			addBank,
			removeBank,
			addDelivery,
			removeDelivery
		} }>
			{ children }
		</ContextTrolley.Provider>
	);
}
