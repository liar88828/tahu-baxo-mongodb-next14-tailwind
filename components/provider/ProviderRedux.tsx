'use client'
import React from 'react';
import { Provider } from "react-redux";
import { store } from "@/store/store";

function ProviderRedux({ children }: { children: React.ReactNode }) {
	
	// const storeRef = useRef<AppStore>();
	// if (!storeRef.current) {
	// storeRef.current = store()
	// storeRef.current.dispatch(initialCount(count))
	// }
	return (
		<Provider store={ store }>
			{ children }
		</Provider>
	);
}

export default ProviderRedux;