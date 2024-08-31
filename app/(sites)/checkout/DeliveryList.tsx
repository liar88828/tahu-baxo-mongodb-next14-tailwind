import React from "react";

export function DeliveryList() {
  return (
    <div>
      <div className="flex justify-between items-center w-full text-2xl mb-2">
        <h1 className={'font-bold text-xl'}>Delivery Method</h1>
        <button className={'btn btn-primary btn-sm'}>Select</button>
      </div>
      <div className=' space-y-2 '>
        <DeliveryListItem />
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

export function DeliveryListItem() {
  return (
    <div className="card card-bordered bg-base-200 border-white/50 card-compact w-full">
      <div className="card-body">
        <div className="flex justify-between items-center w-full text-2xl mb-2">
          <h1 className="card-title">JNT</h1>
          <input type="checkbox" defaultChecked className="checkbox checkbox-sm" />
        </div>
        <h2 className={'text-lg font-semibold text-nowrap'}>342-234-234-234-34</h2>
      </div>
    </div>
  );
}
