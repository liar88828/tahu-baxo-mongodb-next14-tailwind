'use client'
import React from 'react';
import { IconX } from "@/components/icon/IconMore";

interface ModalProps {
	keys: string;
	classNames: string;
	buttonText: React.ReactNode;
	children: React.ReactNode;
}

function Modal({ keys, buttonText, children, classNames }: ModalProps) {
	return (<>
			{/*//@ts-ignore*/ }
			<button className={ `btn  ${ classNames }` } onClick={ () => document.getElementById(keys).showModal() }>
				{ buttonText }
			</button>
			<dialog id={ keys } className="modal">
				<div className="modal-box">
					{ children }
					<div className="modal-action">
						<form method="dialog">
							{/* if there is a button in form, it will close the modal */ }
							<button className="btn"><IconX/></button>
						</form>
					</div>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
		</>
	)
		;
}

export default Modal;