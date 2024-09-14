import { DeliveryDB } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DeliveryState {
	value: DeliveryDB | null
}

const initialState: DeliveryState = {
	value: null,
}

export const deliverySlice = createSlice({
	name: "delivery",
	initialState,
	reducers: {
		addDelivery: (state, action: PayloadAction<DeliveryDB>) => {
			state.value = action.payload
		},
		removeDelivery: (state) => {
			state.value = null
		}
	}
})
export const deliveryAction = deliverySlice.actions
export default deliverySlice.reducer