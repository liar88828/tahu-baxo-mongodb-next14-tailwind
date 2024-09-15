import React from 'react';
import Link from "next/link";
import { getTransactionComplete } from "@/server/action/transaction.action";
import ErrorComponent from "@/components/ErrorComponent";
import { SearchParams } from "@/interface/model/model";
import { toDate } from "@/lib/utils/formatDate";
import { Rupiah } from "@/lib/utils/formatMoney";
import { authCookie } from "@/server/api/authCookie";

async function Page({ params }: SearchParams) {
	const auth = authCookie().getData
	const data = await getTransactionComplete(Number(params.id))
	console.log(data, 'data')
	if (!data) {
		return <ErrorComponent/>
	}
	
	return (
		<>
			<div className="flex justify-center ">
				<iframe
					src="https://lottie.host/embed/c6027413-44af-4784-9120-84d50a3c7100/8RrEvNNS5h.json"
					className={ 'size-44' }
				></iframe>
			</div>
			<div className="p-4 space-y-8">
				<div className="text-center space-y-2">
					<h1 className={ 'font-bold text-2xl' }>Transaction Success</h1>
					<h2 className={ ' text-xl' }>Success { auth.name }</h2>
				</div>
				<div className="rounded-3xl p-5 border shadow-md space-y-3">
					<h1 className='font-bold text-xl'>Detail Transaction</h1>
					<div className="space-y-5 s mt-2">
						{/**/ }
						<div className="flex flex-col">
							<h1 className={ ' font-medium text-neutral/50' }>Transaction ID : </h1>
							<h2 className={ 'text-sm font-semibold' }>{ data.orderanDBId }</h2>
						</div>
						<TextTransaction title={ 'Date' } text={ toDate(data.created_at) }/>
						<TextTransaction title={ "Type Transaction" } text={ data?.BankDB?.name ?? '' }/>
						<TextTransaction title={ "Shipping Cost" } text={ Rupiah(data?.OrderanDB?.shipping_cost ?? 0) }/>
						<TextTransaction title={ "Number Phone" } text={ data?.ReceiverDB?.phone ?? '' }/>
						
						<div className="flex justify-between w-full">
							<h1 className={ 'text font-medium text-neutral/50' }>Status</h1>
							<div className="badge badge-success badge-outline ">
								<h2 className={ 'text font-semibold ' }>{ data?.OrderanDB?.status ?? '' }</h2>
							</div>
						</div>
						
						<div className="divider"></div>
						<div className="flex justify-between w-full mt-2">
							
							<h1 className={ 'text font-medium ' }>Total</h1>
							<h2 className={ 'text font-semibold' }>{ Rupiah(data?.OrderanDB?.total) }</h2>
						</div>
					</div>
				</div>
				<Link
					href={ '/home' }
					className={ 'btn btn-block btn-success font-bold shadow-md text-base-200 text-lg' }
				>
					Back Home
				</Link>
			</div>
		</>
	
	);
}

export default Page;

const TextTransaction = (
	{ title, text }:
		{
			title: string, text: string | number,
		}
) => {
	return (
		<div className="flex justify-between w-full">
			<h1 className={ 'text font-medium text-neutral/50' }>{ title }</h1>
			<h2 className={ 'text font-semibold text-neutral/80' }>{ text }</h2>
		</div>
	);
};
