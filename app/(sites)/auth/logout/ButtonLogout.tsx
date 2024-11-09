'use client'

import React from 'react';
import { useFormState } from "react-dom";
import { onLogout } from "@/server/action/auth.action";
import { initialState } from "@/interface/model/auth.type";

function ButtonLogout() {
	const [state, formAction,] = useFormState(onLogout, initialState)
	
	return (<>
			<form action={ formAction }>
				<button
					type={ 'submit' }
					className="btn btn-primary btn-lg"
				>Logout
				</button>
			</form>
			<p className={ 'text text-error ' }>
				
				{ state.message ?? '' }
			</p>
		
		</>
	);
}

export default ButtonLogout;