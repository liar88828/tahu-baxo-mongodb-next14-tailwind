'use client'
import React, { createContext, ReactNode, useState } from 'react';
import { UserPublic } from "@/interface/user/UserPublic";
import { BankDB, DeliveryDB, TrolleyDB } from "@prisma/client";

type TrolleyContext = TrolleyDB & { price: number }
type DescriptionCheckout = {
	note: string,
	price: number,
	distance: string,
	packing: string
	
}

export type TCheckoutContext = {
	user: UserPublic | null,
	trolley: TrolleyContext | null,
	trolleyMany: TrolleyContext[],
	bank: BankDB | null
	delivery: DeliveryDB | null
	description: DescriptionCheckout
}
export type TProviderCheckout = {
	state: TCheckoutContext
	reduce: React.Dispatch<React.SetStateAction<TCheckoutContext>>
	removeUser: () => void
	addUser: (user: UserPublic) => void
	removeTrolley: () => void
	addTrolley: (trolley: TrolleyContext) => void
	removeTrolleyMany: (trolleyId: number) => void
	addTrolleyMany: (trolley: TrolleyContext) => void
	removeBank: () => void
	addBank: (bank: BankDB) => void
	removeDelivery: () => void
	addDelivery: (delivery: DeliveryDB) => void
	description: (item: Partial<DescriptionCheckout>) => void
}
const initialState: TCheckoutContext = {
	user: null,
	trolley: null,
	trolleyMany: [],
	bank: null,
	delivery: null,
	description: {
		note: '',
		distance: "",
		packing: "",
		price: 0
	}
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
		addTrolleyMany: () => {
		},
		removeTrolleyMany: () => {
		},
		addBank: () => {
		},
		removeBank: () => {
		},
		addDelivery: () => {
		},
		removeDelivery: () => {
		},
		description: () => {
		
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
	
	const addTrolley = (trolley: TrolleyContext,) => setCheckout(prevState => ({
		...prevState, trolley: trolley
	}))
	const removeTrolley = () => setCheckout(prevState => ({
		...prevState, trolley: null
	}))
	
	const addTrolleyMany = (trolley: TrolleyContext,) => setCheckout(prevState => ({
		...prevState, trolleyMany: [...prevState.trolleyMany, trolley]
	}))
	
	const removeTrolleyMany = (trolleyId: number) => setCheckout(prevState => ({
		
		...prevState, trolleyMany: prevState.trolleyMany.filter(t => t.id !== trolleyId)
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
	const description = (value: Partial<DescriptionCheckout>) => {
		setCheckout(prevState => ({
			...prevState, description: {
				...prevState.description,
				...value,
			}
		}))
	}
	
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
			removeDelivery,
			removeTrolleyMany,
			addTrolleyMany,
			description
		} }>
			{ children }
		</ContextTrolley.Provider>
	);
}
