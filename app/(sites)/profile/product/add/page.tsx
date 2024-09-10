'use client'
import React from 'react';
import { useFormState, useFormStatus } from "react-dom";
import { initialState } from "@/interface/model/auth.type";
import { createProduct } from "@/server/action/product.action";

function Page() {
	
	const [state, formAction,] = useFormState(createProduct, initialState)
	const { pending } = useFormStatus();
	console.log(state)
	// if (state?.message?.[0] === 'true') {
	// 	redirect('/auth/otp')
	// }
	
	return (
		<div className="p-5 space-y-5">
			<div className="text-left">
				<h1 className={ 'text-3xl font-bold' }>Add Product</h1>
				<p className={ 'text-lg font-light' }>Add New Product</p>
			</div>
			
			<form
				action={ formAction }
				className="space-y-5"
			>
				<div>
					<label htmlFor="name">Name</label>
					<input
						name={ 'name' }
						type="text"
						className={ 'input input-bordered w-full' }
						placeholder="Enter Name Product ..."
					/>
					{/*{ state?.email &&*/ }
					{/*	<p className={ 'text-error text-xs' }>*/ }
					{/*		{ state.email }*/ }
					{/*	</p>*/ }
					{/*}*/ }
				</div>
				
				<div>
					<label htmlFor="jenis">Jenis</label>
					<input
						name={ 'jenis' }
						type="text"
						className={ 'input input-bordered w-full' }
						placeholder="Enter Jenis Product ..."
					/>
					{/*{ state?.email &&*/ }
					{/*	<p className={ 'text-error text-xs' }>*/ }
					{/*		{ state.email }*/ }
					{/*	</p>*/ }
					{/*}*/ }
				</div>
				
				
				<div>
					<label htmlFor="lokasi">Lokasi</label>
					<input
						name={ 'lokasi' }
						type="text"
						className={ 'input input-bordered w-full' }
						placeholder="Enter Lokasi Product ..."
					/>
					{/*{ state?.email &&*/ }
					{/*	<p className={ 'text-error text-xs' }>*/ }
					{/*		{ state.email }*/ }
					{/*	</p>*/ }
					{/*}*/ }
				</div>
				
				
				<div>
					<label htmlFor="keterangan">Keterangan</label>
					<input
						name={ 'keterangan' }
						type="text"
						className={ 'input input-bordered w-full' }
						placeholder="Enter Keterangan Product ..."
					/>
					{/*{ state?.email &&*/ }
					{/*	<p className={ 'text-error text-xs' }>*/ }
					{/*		{ state.email }*/ }
					{/*	</p>*/ }
					{/*}*/ }
				</div>
				
				
				<div>
					<label htmlFor="jumlah">Jumlah</label>
					<input
						name={ 'jumlah' }
						type="number"
						className={ 'input input-bordered w-full' }
						placeholder="Enter Jemlah Product ..."
					/>
					{/*{ state?.email &&*/ }
					{/*	<p className={ 'text-error text-xs' }>*/ }
					{/*		{ state.email }*/ }
					{/*	</p>*/ }
					{/*}*/ }
				</div>
				
				
				<div>
					<label htmlFor="harga">Harga</label>
					<input
						name={ 'harga' }
						type="number"
						className={ 'input input-bordered w-full' }
						placeholder="Enter harga Product ..."
					/>
					{/*{ state?.email &&*/ }
					{/*	<p className={ 'text-error text-xs' }>*/ }
					{/*		{ state.email }*/ }
					{/*	</p>*/ }
					{/*}*/ }
				</div>
				
				<button
					disabled={ pending }
					type="submit" className={ 'btn btn-block btn-primary' }
				>Add
				</button>
			</form>
		
		
		</div>
	);
}

export default Page;

export type ProductDB = {
	id: number;
	nama: string;
	lokasi: string;
	jenis: string;
	img: string | null;
	harga: number;
	jumlah: number;
	keterangan: string;
	userId: string;
}