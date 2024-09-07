import { repeat } from "@/lib/utils/repeat";
import React from "react";
import { ProductDB } from "@prisma/client";
import { Rupiah } from "@/lib/utils/formatMoney";

export function Description({ item }: { item: ProductDB }) {
	return (
		<div className='p-2 space-y-4'>
			<h1 className={ 'text-xl font-medium  line-clamp-2 text-ellipsis' }>{ item.nama }</h1>
			<div className="flex">
				
				<h2 className={ 'font-bold text-2xl text-primary' }>{ Rupiah(item.harga) }</h2>
				<p className={ 'font-light line-through' }>{ Rupiah(item.harga) }</p>
			</div>
			<div className="">
				<div className="space-x-1">
					<span className={ 'font-bold text-lg ' }>Size :</span>
					<span className={ 'font-light text-lg' }>XL</span>
				</div>
				<div className="overflow-x-auto flex space-x-2 mt-1">
					{ repeat()
						.map((_, i) => (
							<button key={ i } className={ 'btn btn-outline font-bold text-xl' }>S</button>)
						) }
				</div>
			</div>
			<div className="">
				<h1 className={ 'font-bold ' }>Description</h1>
				<p className={ 'text-justify' }>{ item.keterangan }</p>
			</div>
		</div>
	);
}
