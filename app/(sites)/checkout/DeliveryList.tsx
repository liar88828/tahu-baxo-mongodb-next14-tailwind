import React from "react";
import { getDeliveryAll } from "@/server/action/delivery.action";
import { DeliveryDB } from "@prisma/client";

export async function DeliveryList() {
  const data = await getDeliveryAll()
  if (!data) {
    return <h1>Data Delivery is Empty </h1>
  }
  return (
    <div>
      <div className="flex justify-between items-center w-full text-2xl mb-2">
        <h1 className={'font-bold text-xl'}>Delivery Method</h1>
        <button className={'btn btn-primary btn-sm'}>Select</button>
      </div>
      <div className=' space-y-2 '>
        <div className="flex w-full overflow-x-scroll">
          {data.map(item => (

            <DeliveryListItem item={item} key={item.id} />
          ))}
        </div>
        <div className="">
          <div className="grid grid-cols-2 gap-2">
            <input type="text" className={'input  input-bordered '} placeholder={'Add Price'} />
            <input type="text" className={'input  input-bordered'} placeholder={'Long'} />
          </div>
          <div className="mt-2">
            <select className="select select-bordered w-full ">
              <option disabled selected>Select Packing</option>
              <option>Kargo</option>
              <option>Send</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )

}

interface DeliveryListItemProps {
  item : DeliveryDB
}

export function DeliveryListItem({item} : DeliveryListItemProps) {
  return (
    <div className="card card-bordered bg-base-200/50 border-white/50 card-compact w-full shadow">
      <div className="card-body">
        <div className="flex justify-between items-center w-full text-2xl mb-2">
          <h1 className="card-title">{item.nama}</h1>
          <input type="checkbox" defaultChecked className="checkbox checkbox-sm" />
        </div>
        <h2 className={'text-lg font-semibold text-nowrap'}>{item.hp}</h2>
      </div>
    </div>
  );
}
