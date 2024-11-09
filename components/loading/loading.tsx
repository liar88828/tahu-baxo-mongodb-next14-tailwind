export function Loading() {
	return (
		<span
			data-testid="Loading"
			className="loading loading-spinner loading-lg"></span>
	);
}

export function LoadingBounce() {
	return (
		<div
			data-testid={ "LoadingBounce" }
			className={ 'animate-bounce w-full flex justify-center items-center pt-52 ' }>
			<span className="loading loading-spinner loading-lg"></span>
		</div>
	)
}