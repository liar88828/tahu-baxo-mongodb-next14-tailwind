import React from 'react'
import { IconAdd, IconBox, IconTruck } from "@/components/icon/IconMore";
import Divider from "@/components/elements/Divider";
import { OrderSummary } from "@/app/(sites)/profile/(menu)/recent/OrderSummary";
import { getTransactionCompleteById } from "@/server/action/transaction.action";
import { SearchParams } from "@/interface/model/model";
import ErrorComponent from "@/components/error/ErrorComponent";
import { toDate } from "@/lib/utils/formatDate";
import { Rupiah } from "@/lib/utils/formatMoney";
import { orderStatuses } from "@/app/(sites)/profile/(menu)/recent/orderStatuses";

export default async function Page({ params }: SearchParams) {
	const data = await getTransactionCompleteById(Number(params.id))
	console.log(data)
	
	if (!data) {
		return <ErrorComponent/>
	}
	if (!data.OrderanDB || !data.ReceiverDB || !data.BankDB) {
		return <ErrorComponent/>
	}
	return (<div className=" card card-compact sm:card-normal card-bordered w-full  ">
					<div className="card-body space-y-2">
						
						<div className="">
							<div className="flex w-full justify-between">
								<h1 className="card-title text-2xl">Order Details</h1>
								<div className=" badge badge-outline mt-2">{ data.OrderanDB.status }</div>
							</div>
							<div className={ 'mt-2' }>
								<p className={ 'text-xs ' }>Order { data.orderanDBId } </p>
								<p>- Placed on { toDate(data.OrderanDB.created_at) }</p>
							</div>
						</div>
						
						<div className="flex justify-between items-center">
							{ orderStatuses.map((status, index) => (
								<div key={ status.name } className="flex flex-col items-center">
									<div
										className={ `w-8 h-8 rounded-full flex items-center justify-center ${ status.completed ? 'bg-green-500' : 'bg-gray-300' }` }>
										{ status.completed ? (
											<IconAdd/>
										) : (
											<span className="text-white font-bold">{ index + 1 }</span>
										) }
									</div>
									<span className="mt-2 text-sm font-medium">{ status.name }</span>
									{ index < orderStatuses.length - 1 && (
										<div className={ `h-1 w-24 mt-4 ${ status.completed ? 'bg-green-500' : 'bg-gray-300' }` }/>
									) }
								</div>
							)) }
						</div>
						{/**/ }
						
						<OrderSummary
							subTotal={ data.OrderanDB.sub_total }
							trolley={ data.TrolleyDB }
						/>
						
						<Divider/>
						
						<div>
							<h3 className="text-lg font-semibold mb-2">Price Details</h3>
							<div className="space-y-1">
								<div className="flex justify-between text-sm">
									<span>Subtotal</span>
									<span>${ Rupiah(data.OrderanDB.sub_total) }</span>
								</div>
								<div className="flex justify-between text-sm">
									<span>Shipping</span>
									<span>${ Rupiah(data.OrderanDB.shipping_cost) }</span>
								</div>
								<div className="flex justify-between text-sm">
									<span>Tax</span>
									<span>${ 123 }</span>
								</div>
								<Divider/>
								<div className="flex justify-between font-medium">
									<span>Total</span>
									<span>${ Rupiah(data.OrderanDB.total) }</span>
								</div>
							</div>
						</div>
						<Divider/>
						
						<div>
							<h3 className="text-lg font-semibold mb-2">Shipping Information</h3>
							<div className="flex items-start space-x-2">
								<IconTruck className="h-5 w-5 mt-0.5"/>
								<div>
									<p className="font-medium">Shipping Address</p>
									<p className="text-sm text-gray-600">{ data.ReceiverDB.address }</p>
								</div>
							</div>
						</div>
						<Divider/>
						
						<div>
							<h3 className="text-lg font-semibold mb-2">Payment Method</h3>
							<div className="flex items-center space-x-2">
								<IconBox className="h-5 w-5"/>
								<span>{ data.BankDB.name }</span>
							</div>
						</div>
						<Divider/>
						
						<div className="">
							<h1 className={ 'text-lg font-semibold mb-2' }>Description</h1>
							<p>{ data.OrderanDB.desc }</p>
						</div>
						<div className="">
							<button className="btn mt-2 btn-block">Track Order</button>
						</div>
					</div>
				</div>
	)
}

