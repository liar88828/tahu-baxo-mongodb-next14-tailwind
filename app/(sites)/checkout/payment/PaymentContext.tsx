'use client'
import { useBank } from "@/store/useBank";
import { ItemNotFound } from "@/app/(sites)/checkout/ItemNotFound";
import { PaymentItem } from "@/app/(sites)/checkout/payment/PaymentItem";
import React from "react";

export function PaymentContext() {
	const { bank, removeBank } = useBank()
	
	if (!bank) {
		return <ItemNotFound
			title={ "Please Add Payment" }
			fun={ () => {
				// @ts-expect-error
				document.getElementById('modalPayment').showModal()
			}
			}/>
	}
	return (
		<div>
			<PaymentItem
				item={ bank }
				fun={ removeBank }
				add={ false }/>
		</div>
	);
}