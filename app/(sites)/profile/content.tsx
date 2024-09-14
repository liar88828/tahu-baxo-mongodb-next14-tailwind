'use client'
import React from "react";
import { IconLocation, IconMoney, IconTrolley } from "@/components/icon/IconMore";
import { Icon } from "@iconify/react";
import Link from "next/link";

const recentActivity = [
	{ id: 1, text: "Order #ORD-001 has been delivered", date: "2 hours ago" },
	{ id: 2, text: "You've earned 50 loyalty points", date: "1 day ago" },
	{ id: 3, text: "Successfully charged $79.99 for Order #ORD-002", date: "3 days ago" },
];
const orderHistory = [
	{ id: "ORD-001", date: "2023-06-01", total: "$125.00", status: "Delivered" },
	{ id: "ORD-002", date: "2023-05-15", total: "$79.99", status: "Shipped" },
	{ id: "ORD-003", date: "2023-04-30", total: "$249.50", status: "Processing" },
];
const paymentMethod = [
	{ type: "Visa", last4: "1234", expiry: "12/24" },
	{ type: "Mastercard", last4: "5678", expiry: "06/25" },
];

export function Content() {
	return (<>
			<ProfileStatus/>
			<ProfileRecent/>
			<ProfileOrderHistory/>
			<ProfileSetting/>
			<ProfilePaymentMethods/>
		</>
	);
}

export function Shipping() {
	return (
		<div className={ 'card card-bordered card-compact ' }>
			<div className="card-body">
				<div className={ 'card-title' }>
					
					<div className="flex items-center gap-2">
						<IconLocation/>
						Shipping Address
					</div>
				</div>
				<div>
					<h1 className={ 'text-xl font-bold' }>Jane Doe</h1>
					<p>123 E-commerce St Shop ville, SP 12345 United States</p>
					<button className="btn mt-4">
						Detail
					</button>
				</div>
			</div>
		</div>
	);
}

export function ProfileStatus() {
	return (
		<div className="grid grid-cols-2 gap-4 mb-6">
			<div className="flex items-center gap-2 bg-primary/10 p-4 rounded-lg">
				<IconTrolley/>
				<div>
					<p className="text-sm font-medium">Total Orders</p>
					<p className="text-2xl font-bold">42</p>
				</div>
			</div>
			<div className="flex items-center gap-2 bg-primary/10 p-4 rounded-lg">
				<IconMoney className="h-5 w-5 text-primary"/>
				<div>
					<p className="text-sm font-medium">Total Spent</p>
					<p className="text-2xl font-bold">$1,234.56</p>
				</div>
			</div>
		</div>
	
	);
}

export function ProfileRecent() {
	return (
		<div className="space-y-4">
			<h3 className="text-lg font-semibold">Recent Activity</h3>
			<div className="space-y-4">
				{ recentActivity.map((item, index) => (
					<Link
						href={ `/profile/order/${ item.id }` }
						key={ index }
						className="flex items-start space-x-4">
						<div className="bg-primary/10 p-2 rounded-full">
							<Icon icon={ 'mdi:trolley' } className="h-5 w-5 text-primary"/>
						</div>
						<div className="flex-1">
							<p className="text-sm font-medium">{ item.text }</p>
							<p className="text-xs text-muted-foreground">{ item.date }</p>
						</div>
					</Link>
				)) }
			</div>
		</div>
	
	);
}

export function ProfileOrderHistory() {
	return (<section className="mt-6">
			<div className="space-y-4">
				<h3 className="text-lg font-semibold">Order History</h3>
				{ orderHistory.map((order) => (
					<div key={ order.id } className="flex justify-between items-center border-b pb-4">
						<div>
							<p className="font-medium">{ order.id }</p>
							<p className="text-sm text-muted-foreground">{ order.date }</p>
						</div>
						<div className="text-right">
							<p className="font-medium">{ order.total }</p>
							<div className={ 'badge' }>{ order.status }</div>
						</div>
					</div>
				)) }
			</div>
		</section>
	);
}

export function ProfileInfo() {
	return (<>
			<div className="bg-gradient-to-r from-blue-500 to-purple-500 h-32"></div>
			<div className="relative pb-0 ">
				<div className="flex flex-col sm:flex-row items-center sm:items-end sm:justify-between sm:mx-10">
					<div className="flex flex-col sm:flex-row items-center sm:space-x-4 ">
						
						<div className="w-24 h-24  -mt-12 sm:-mt-16  ">
							<img alt="User avatar"
									 src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=338&ext=jpg&ga=GA1.1.1413502914.1726185600&semt=ais_hybrid"
									 className={ 'rounded-full object-cover border' }
							/>
						</div>
						<div className="mt-2 sm:mt-0 text-center sm:text-left">
							<div className="text-2xl font-bold">Jane Doe</div>
							<p className="text-sm text-muted-foreground">jane.doe@example.com</p>
							<div className="mt-2 badge badge-info">
								Gold Member
							</div>
						</div>
					</div>
					<button className=" btn mt-4 sm:mt-0 hidden sm:inline">Edit Profile</button>
				</div>
			</div>
		</>
	)
}

export function ProfilePaymentMethods() {
	return (
		<section className="mt-6">
			<div className="space-y-4">
				<h3 className="text-lg font-semibold">Payment Methods</h3>
				<div className="space-y-4">
					{ paymentMethod.map((card, index) => (
						<div key={ index } className="flex justify-between items-center border-b pb-4">
							<div className="flex items-center space-x-4">
								<div className="bg-primary/10 p-2 rounded-full">
									<div className="h-5 w-5 text-primary"/>
								</div>
								<div>
									<p className="font-medium">{ card.type } ending in { card.last4 }</p>
									<p className="text-sm text-muted-foreground">Expires { card.expiry }</p>
								</div>
							</div>
							<button className={ 'btn' }>Edit</button>
						</div>
					)) }
				</div>
				<button className="btn w-full">Add New Payment Method</button>
			</div>
		</section>
	);
}

export function ProfileSetting() {
	return <div className="mt-6">
		<div className="space-y-4">
			<h3 className="text-lg font-semibold">Setting Profile</h3>
			<div className="grid gap-4">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-4">
						<div className="bg-primary/10 p-2 rounded-full">
							<div className="h-5 w-5 text-primary"/>
						</div>
						<div>
							<p className="font-medium">Edit Profile</p>
							<p className="text-sm text-muted-foreground">Update your profile information</p>
						</div>
					</div>
					<button className={ 'btn' }>Edit</button>
				</div>
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-4">
						<div className="bg-primary/10 p-2 rounded-full">
							<div className="h-5 w-5 text-primary"/>
						</div>
						<div>
							<p className="font-medium">Change Password</p>
							<p className="text-sm text-muted-foreground">Update your account password</p>
						</div>
					</div>
					<button className={ 'btn' }>Change</button>
				</div>
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-4">
						<div className="bg-primary/10 p-2 rounded-full">
							<div className="h-5 w-5 text-primary"/>
						</div>
						<div>
							<p className="font-medium">Notification Preferences</p>
							<p className="text-sm text-muted-foreground">Manage your notification settings</p>
						</div>
					</div>
					<button className={ 'btn' }>Manage</button>
				</div>
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-4">
						<div className="bg-primary/10 p-2 rounded-full">
							<div className="h-5 w-5 text-primary"/>
						</div>
						<div>
							<p className="font-medium">Privacy Settings</p>
							<p className="text-sm text-muted-foreground">Control your privacy options</p>
						</div>
					</div>
					<button className={ 'btn' }>Adjust</button>
				</div>
			</div>
		</div>
	</div>
}
