'use client'

export default function ErrorBoundary( {
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
} ) {
  console.log('error.ts')
  console.log(error)
  return (
    <div>
      <h2 className={ 'font-bold' }>Something went wrong!</h2>
      <h3>{ error.message }</h3>
    </div>
  )
}
