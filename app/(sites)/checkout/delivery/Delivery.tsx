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
      <div className="flex justify-between items-center w-full text-2xl mb-2">
        <h1 className={'font-bold text-xl'}>Delivery Method</h1>
				<DeliveryModal data={ data.data }/>
      </div>
      <div className=' space-y-2 '>
				<DeliveryContext/>
        <div className="">
          <div className="grid grid-cols-2 gap-2">
            <input type="text" className={'input  input-bordered '} placeholder={'Add Price'} />
            <input type="text" className={'input  input-bordered'} placeholder={'Long'} />
          </div>
          <div className="mt-2">
            <select className="select select-bordered w-full " defaultValue={ 'Select Packing' }>
              <option value={ "Kargo" }>Kargo</option>
              <option value={ "Send" }>Send</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )

}

