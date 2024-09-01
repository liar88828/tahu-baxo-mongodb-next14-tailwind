import React from "react";

export function PaymentList() {
  return (
    <div>
      <div className="flex justify-between items-center w-full text-2xl mb-2">
        <h1 className={'font-bold text-xl'}>Payment Method</h1>
        <button className={'btn btn-primary btn-sm'}>Show</button>
      </div>
        <PaymentListItem />
    </div>
  )
}

export function PaymentListItem() {
  return (
    <div className="card card-bordered bg-base-200/50 border-white/50 card-compact w-full shadow">
      <div className="card-body">
        <div className="flex justify-between items-center w-full text-2xl mb-2">
          <h1 className="card-title">Mandiri</h1>
          <input type="checkbox" defaultChecked className="checkbox checkbox-sm" />
        </div>
        <h2 className={'text-lg font-semibold text-nowrap'}>342-234-234-234-34</h2>
      </div>
    </div>
  );
}
