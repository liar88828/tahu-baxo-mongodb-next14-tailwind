'use client'
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/store/counter";
import deliveryReducer from "@/store/checkout/delivery";

export const store = configureStore({
		reducer: {
			counter: counterReducer,
			delivery: deliveryReducer,
		},
	}
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

//
// export type AppStore = ReturnType<typeof store>
// export type RootState = ReturnType<AppStore['getState']>
// export type AppDispatch = AppStore['dispatch']
// // Use throughout your app instead of plain `useDispatch` and `useSelector`
// export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
// export const useAppSelector = useSelector.withTypes<RootState>()
// export const useAppStore = useStore.withTypes<AppStore>()