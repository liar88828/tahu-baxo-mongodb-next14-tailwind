'use client'
import React, { useState } from 'react'
import { IconAdd, IconBack, IconBox, IconRemove, IconTruck } from "@/components/icon/IconMore";
import Divider from "@/components/Divider";
import Link from "next/link";

export default function Component() {
	const [isItemsExpanded, setIsItemsExpanded] = useState(false)
	
	const orderDetails = {
		orderId: '#ORD-12345',
		date: 'May 15, 2023',
		status: 'Shipped',
		items: [
			{ name: 'Wireless Headphones', price: 129.99, quantity: 1 },
			{ name: 'Smartphone Case', price: 24.99, quantity: 2 },
			{ name: 'USB-C Cable', price: 9.99, quantity: 3 },
		],
		subtotal: 209.95,
		shipping: 5.99,
		tax: 17.84,
		total: 233.78,
		shippingAddress: '123 Main St, Anytown, ST 12345',
		paymentMethod: 'Visa ending in 1234',
	}
	
	const orderStatuses = [
		{ name: 'Processing', completed: true },
		{ name: 'Shipped', completed: true },
		{ name: 'Delivered', completed: false },
	]
	
	return (
		<>
			<div className='navbar bg-base-100'>
				<div className='navbar-start'>
					<Link
						href='/profile'
						className='btn btn-ghost btn-circle'
					>
						<IconBack/>
					</Link>
				</div>
				<div className='navbar-center'>
					<a className='btn btn-ghost text-xl'>Profile</a>
				</div>
				<div className='navbar-end'>
					<button className='btn btn-ghost btn-circle'>
					
					</button>
					<button className='btn btn-ghost btn-circle'>
						<div className='indicator'>
						
						</div>
					</button>
				</div>
			</div>
			
			{/**/ }
			<div className="p-4">
				<div className=" card card-context card-bordered w-full  ">
					<div className="card-body space-y-2">
						
						<div className="">
							<div className="flex w-full justify-between">
								<h1 className="card-title text-2xl">Order Details</h1>
								<div className=" badge badge-outline mt-2">{ orderDetails.status }</div>
							</div>
							<div className={ 'mt-2' }>
								Order { orderDetails.orderId } - Placed on { orderDetails.date }
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
						<div>
							<h3 className="text-lg font-semibold mb-2">Order Summary</h3>
							<div className="flex justify-between items-center">
								<button
									onClick={ () => setIsItemsExpanded(!isItemsExpanded) }
									className=" btn btn-sm"
								>
									{ isItemsExpanded ? (
										<IconRemove className="mx-2"/>
									) : (
										<IconAdd className="mx-2"/>
									) }
									{ orderDetails.items.length } items
								</button>
								<span className="font-medium">${ orderDetails.subtotal.toFixed(2) }</span>
							</div>
							{ isItemsExpanded && (
								<ul className="mt-2 space-y-2">
									{ orderDetails.items.map((item, index) => (
										<li
											key={ index }
											className="flex justify-between text-sm">
											<span>{ item.quantity }x { item.name }</span>
											<span>${ (item.price * item.quantity).toFixed(2) }</span>
										</li>
									)) }
								</ul>
							) }
						</div>
						<Divider/>
						
						<div>
							<h3 className="text-lg font-semibold mb-2">Price Details</h3>
							<div className="space-y-1">
								<div className="flex justify-between text-sm">
									<span>Subtotal</span>
									<span>${ orderDetails.subtotal.toFixed(2) }</span>
								</div>
								<div className="flex justify-between text-sm">
									<span>Shipping</span>
									<span>${ orderDetails.shipping.toFixed(2) }</span>
								</div>
								<div className="flex justify-between text-sm">
									<span>Tax</span>
									<span>${ orderDetails.tax.toFixed(2) }</span>
								</div>
								<Divider/>
								<div className="flex justify-between font-medium">
									<span>Total</span>
									<span>${ orderDetails.total.toFixed(2) }</span>
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
									<p className="text-sm text-gray-600">{ orderDetails.shippingAddress }</p>
								</div>
							</div>
						</div>
						<Divider/>
						
						<div>
							<h3 className="text-lg font-semibold mb-2">Payment Method</h3>
							<div className="flex items-center space-x-2">
								<IconBox className="h-5 w-5"/>
								<span>{ orderDetails.paymentMethod }</span>
							</div>
						</div>
						<div className="">
							
							<button className="btn mt-2 btn-block">Track Order</button>
						</div>
					</div>
				</div>
			</div>
		
		</>
	)
}
