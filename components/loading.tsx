export function Loading() {
  return (
    <span className="loading loading-spinner loading-lg"></span>

  );
}

export function LoadingBounce() {
	return (
		<div className={ 'animate-bounce w-full flex justify-center items-center pt-52 ' }>
			<span className="loading loading-spinner loading-lg"></span>
		</div>
	)
}