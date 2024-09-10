import React from "react";
import { IconWarning } from "@/components/icon/IconMore";

export function ItemNotFound({ title, fun }: { title: string, fun: () => void }) {
	return (
		<div className={ 'card card-bordered card-compact shadow' }>
			<div className="card-body flex justify-between flex-row">
				<h1 className={ 'card-title' }>
					<IconWarning className={ ' text-error mx-2 ' }/>
					<span>{ title }</span>
				</h1>
				<div className="">
					<button onClick={ fun } className={ 'btn btn-primary btn-sm' }> Add</button>
				</div>
			</div>
		</div>
	)
		;
}