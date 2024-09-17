import Link from "next/link";
import { Icon } from "@iconify/react";
import React, { Suspense } from "react";
import { getTransaction, getTransactionComplete } from "@/server/action/transaction.action";
import { toDate } from "@/lib/utils/formatDate";
import { EmptyComponent } from "@/components/error/EmptyComponent";
import { IconDetail } from "@/components/icon/IconMore";
import ErrorComponent from "@/components/error/ErrorComponent";
import { SearchTitle } from "@/components/title/TitleSearch";
import Divider from "@/components/elements/Divider";
import { OrderSummaryItem } from "@/app/(sites)/profile/(menu)/recent/OrderSummary";

export async function ProfileRecent() {
	const data = await getTransaction()
	if (!data) {
		return <EmptyComponent/>
	}
	return (
		<div className="space-y-4">
			<div className="flex w-full justify-between">
				<h3 className="text-lg font-semibold">Recent Activity</h3>
				<Link href={ '/profile/recent' } className={ 'btn btn-sm' }>Show All</Link>
			</div>
			
			<div className="space-y-4 overflow-y-scroll h-52">
				
				{ data.map((item, index) => (
					<section
						key={ item.id }
						className="flex items-start space-x-4">
						
						<div className="bg-primary/10 p-2 rounded-full">
							<Icon icon={ 'mdi:trolley' } className="h-5 w-5 text-primary"/>
						</div>
						
						<div className="flex-1">
							<div className="">
								<span>Order ID : </span>
								<p className="text-xs font-medium">{ item.orderanDBId }</p>
							</div>
							<p className="text-sm text-muted-foreground">{ toDate(item.created_at) }</p>
						</div>
						
						<div className="flex flex-col items-center">
							<p className={ 'text-xs font-medium' }>
								no : { index + 1 }
							</p>
							<Link
								href={ `/profile/recent/${ item.id }` }
								className=" btn btn-sm btn-square">
								<IconDetail/>
							</Link>
						</div>
					</section>
				)) }
			
			</div>
		</div>
	
	);
}

export async function ProfileRecentPaging() {
	const data = await getTransactionComplete()
	if (!data) {
		return <ErrorComponent/>
		
	}
	if (data.length === 0) {
		return <EmptyComponent/>
	}
	
	return (
		<div className="space-y-4">
			
			<div className="flex w-full justify-between pb-4">
				<h3 className="text-lg font-semibold">Recent Activity</h3>
				<SearchTitle keys={ 'search' }/>
				{/*<Link href={ '/profile/recent' } className={ 'btn btn-sm' }>Total { data.length }</Link>*/ }
			</div>
			
			<div className="space-y-4 ">
				
				{ data.map((item, index) => (
					<>
						<section
							key={ item.id }
							className="">
							<div className="flex items-start space-x-4">
								
								<div className="bg-primary/10 p-2 rounded-full">
									<Icon icon={ 'mdi:trolley' } className="h-5 w-5 text-primary"/>
								</div>
								
								<div className="flex-1">
									<div className="">
										<span>Order ID : </span>
										<p className="text-sm font-medium">{ item.orderanDBId }</p>
									</div>
									<p className="text-sm text-muted-foreground">{ toDate(item.created_at) }</p>
								</div>
								
								<div className="flex flex-col items-center">
									<p className={ 'text-xs font-medium' }>
										no : { index + 1 }
									</p>
									<Link
										href={ `/profile/recent/${ item.id }` }
										className=" btn btn-sm btn-square">
										<IconDetail/>
									</Link>
								</div>
							</div>
							
							<Suspense>
								{ item.OrderanDB
									? <OrderSummaryItem trolley={ item.TrolleyDB }/>
									: null }
							</Suspense>
						
						</section>
						<Divider/>
					</>
				
				)) }
			
			</div>
		</div>
	
	);
}

