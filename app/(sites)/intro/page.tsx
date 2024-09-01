import { redirect } from 'next/navigation'

export default function Page() {
  redirect('/intro/welcome')
  return null
}
