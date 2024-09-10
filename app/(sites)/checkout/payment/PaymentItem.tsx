import { BankDB } from "@prisma/client";
import React from "react";
import { IconAdd, IconRemove } from "@/components/icon/IconMore";

export function PaymentItem({ item, add, fun }: { item: BankDB, add: boolean, fun: () => void }) {
	return (
		<div className="card card-bordered bg-base-200/50 border-white/50 card-compact w-full shadow">
			<div className="card-body">
				<div className="flex justify-between items-center w-full text-2xl mb-2">
					<h1 className="card-title">{ item.nama }</h1>
					<div className="modal-action">
						<form method="dialog">
							<button
								onClick={ fun }
								className='btn btn-circle btn-outline btn-sm'>
								{ add ? <IconAdd/> : <IconRemove/> }
							</button>
						</form>
					</div>
				</div>
				<h2 className={ 'text-lg font-semibold text-nowrap' }>{ item.no }</h2>
			</div>
		</div>
	);
}

