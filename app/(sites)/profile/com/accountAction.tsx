export function AccountAction() {
	return (
		<div className={ 'card' }>
			<div className={ 'card-title' }>
				<div>Account Actions</div>
			</div>
			<div className="flex flex-wrap gap-4">
				<button className={ 'btn ' }>Edit Profile</button>
				<button className={ 'btn ' }>Change Password</button>
				<button className={ 'btn ' }>Privacy Settings</button>
				<button className={ 'btn ' }>Notification Preferences</button>
			</div>
		</div>
	);
}