import React from "react";
import { getBankAll } from "@/server/action/bank.action";
import { BankDB } from "@prisma/client";

export async function PaymentList() {
  const data = await getBankAll()
  if (!data) {
    return <h1>Data Bank is Not found</h1>
  }
  return (
    <div>
      <div className="flex justify-between items-center w-full text-2xl mb-2">
        <h1 className={'font-bold text-xl'}>Payment Method</h1>
        <button className={'btn btn-primary btn-sm'}>Show</button>
      </div>
      {/*// example*/}
      <div className="w-full flex overflow-x-scroll">
        {data.map((item : BankDB, i) => (<PaymentListItem item={item} key={item.id} />))}
      </div>
    </div>
  )
}

export function PaymentListItem({item} : { item : BankDB }) {
  return (
    <div className="card card-bordered bg-base-200/50 border-white/50 card-compact w-full shadow">
      <div className="card-body">
        <div className="flex justify-between items-center w-full text-2xl mb-2">
          <h1 className="card-title">{item.nama}</h1>
          <input type="checkbox" defaultChecked className="checkbox checkbox-sm" />
        </div>
        <h2 className={'text-lg font-semibold text-nowrap'}>{item.no}</h2>
      </div>
    </div>
  );
}
