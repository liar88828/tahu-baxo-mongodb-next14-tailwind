import Link from "next/link";
export default function page() {
  return (
    <main>
      <Link
        href={'/home'}
        className='btn btn-primary'
      >Go Home</Link>
    </main>
  )
}
