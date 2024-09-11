import Link from "next/link";
import { redirect } from "next/navigation";

export default function page() {
	redirect('/home')
  return (
    <main>
      <Link
        href={ '/home' }
        className='btn btn-primary'
      >Go Home</Link>
    </main>
  )
}
