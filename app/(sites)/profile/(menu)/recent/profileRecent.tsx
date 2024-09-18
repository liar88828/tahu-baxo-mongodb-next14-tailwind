import Link from "next/link";
import { Icon } from "@iconify/react";
import React from "react";
import { getTransaction } from "@/server/action/transaction.action";
import { toDate } from "@/lib/utils/formatDate";
import { EmptyComponent } from "@/components/error/EmptyComponent";
import { IconDetail } from "@/components/icon/IconMore";

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

