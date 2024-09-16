import React from "react";
import { getBankAll } from "@/server/action/bank.action";
import { PaymentModal } from "@/app/(sites)/checkout/payment/PaymentModal";
import { PaymentContext } from "@/app/(sites)/checkout/payment/PaymentContext";

export async function Payment() {
  const data = await getBankAll()
  if (!data) {
    return <h1>Data Bank is Not found</h1>
  }
  return (
    <div>
			<div
				data-testid={ 'checkout-Payment' }
				className="flex justify-between items-center w-full text-2xl mb-2">
        <h1 className={'font-bold text-xl'}>Payment Method</h1>
				<PaymentModal data={ data.data }/>
      </div>
      {/*// example*/}
			<PaymentContext/>
		</div>
	)
}

