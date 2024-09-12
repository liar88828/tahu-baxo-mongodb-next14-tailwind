import React from "react";

export function SetUpFace() {
	return (
		<div
			data-testid="done-SetUpFace"
			className="text-left border rounded-lg p-5 space-y-5">
			<div className="space-y-2">
				<h1 className={ 'text-3xl font-bold' }>Set Up Face ID</h1>
				<p className={ 'text-lg font-light' }>Unlock your account quickly and securely using Face ID.</p>
			</div>
			<div className="space-y-2">
				<button className={ 'btn btn-block btn-primary' }>Set Up Face ID</button>
				<p className={ 'text-sm' }>Make sure your device supports Face ID and follow the on-screen instructions.</p>
			</ div>
		</div>
	)
		;
}