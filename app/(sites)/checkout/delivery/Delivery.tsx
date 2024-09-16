import React from "react";
import { getDeliveryAll } from "@/server/action/delivery.action";
import { DeliveryContext, DeliveryModal } from "@/app/(sites)/checkout/delivery/DeliveryModal";

export async function Delivery() {
  const data = await getDeliveryAll()
  if (!data) {
    return <h1>Data Delivery is Empty </h1>
  }
  return (
    <div>
      <div
        data-testid={ 'checkout-Delivery' }
        className="flex justify-between items-center w-full text-2xl mb-2">
        <h1 className={'font-bold text-xl'}>Delivery Method</h1>
				<DeliveryModal data={ data.data }/>
      </div>
				<DeliveryContext/>
    </div>
  )
}

