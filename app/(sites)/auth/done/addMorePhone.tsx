import React from "react";

export function AddMorePhone() {
	return (
		
		<div
			data-testid="done-AddMorePhone"
			
			className="text-left border rounded-lg p-5 space-y-5">
			<div className="space-y-2">
				<h1 className={ 'text-3xl font-bold' }>Add/Verify Phone Number</h1>
				<p className={ 'text-lg font-light' }>Keep your account secure with SMS-based verification.</p>
			</div>
			<div className="space-y-5">
				<div>
					<label htmlFor="email">Phone Number</label>
					<input
						name={ 'phone' }
						type="tel"
						id={ 'phone' }
						className={ 'input input-bordered w-full' }
						placeholder="Enter Your Phone ..."
					/>
				</div>
				<div className="space-y-2">
					<button className={ 'btn btn-block btn-primary' }>Send Verification Code</button>
					<p className={ 'text-sm' }>We will send a verification code to this number. Standard SMS charges may
						apply.</p>
				</div>
			</div>
		</div>
	);
}