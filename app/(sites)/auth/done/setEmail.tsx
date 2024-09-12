import React from "react";

export function SetEmail() {
	return (
		<div
			data-testid="done-SetEmail"
			className="text-left border rounded-lg p-5 space-y-5">
			<div className="space-y-2">
				<h1 className={ 'text-3xl font-bold' }>Set Backup Email</h1>
				<p className={ 'text-lg font-light' }>Add a backup email to recover your account easily if you lose access to
					your
					primary email.</p>
			</div>
			<div className="space-y-5">
				<div>
					<label htmlFor="email">Backup Email Address</label>
					<input
						name={ 'email' }
						type="email"
						id={ 'email' }
						className={ 'input input-bordered w-full' }
						placeholder="Enter Your Email ..."
					/>
				</div>
				<div className="space-y-2">
					<button className={ 'btn btn-block btn-primary' }>Verify Backup Email</button>
					<p className={ 'text-sm' }>A verification link will be sent to this email. Please check your inbox.</p>
				</ div>
			</div>
		</div>
	)
	
}