'use client'
import React from 'react'
import { onAddTrolley } from "@/server/action/trolley.action";

export default function NavBottom({ id_product }: { id_product: number }) {
  return (
    <div className='fixed bottom-0 right-0 left-0 bg-base-100 p-2 grid grid-cols-2 gap-2'>
				<button
					onClick={ () => onAddTrolley(id_product) }
					className='btn btn-outline w-full text-lg'
      >
        Add Trolley
				</button>
      <button
				className='btn btn-primary w-full text-lg'
      >
        Buy Now
      </button>
    </div>
  )
}

export function ModalAddTrolley() {
	return (<>
			<button className="btn" onClick={ () => {
				// @ts-ignore
				document.getElementById('my_modal_1').showModal()
			} }>open modal
			</button>
			<dialog id="my_modal_1" className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Hello!</h3>
					<p className="py-4">Press ESC key or click the button below to close</p>
					<div className="modal-action">
						<form method="dialog">
							{/* if there is a button in form, it will close the modal */ }
							<button className="btn">Close</button>
						</form>
					</div>
				</div>
			</dialog>
		</>
	)
}

