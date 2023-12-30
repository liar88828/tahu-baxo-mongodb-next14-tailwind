import Link from 'next/link';
import { listComplex } from '@/assets/list';

export default function Complex(
  { slug }:
    { slug: string }
) {
  return (
    <div className={ "flex flex-row gap-5 z-50 p-2 justify-between overflow-x-auto " }>
      { listComplex.map( d => {
        const h = d.href.split( "/" ).pop()
        // console.log(d.title)
        return (
          <Link
            data-test={ 'link-' + d.title }
            key={ d.title }
            href={ d.href }
            className={ ` btn  ${ d.className } ${ h === slug ? " btn-disabled " : "" }` }
          >
            { d.title }
          </Link>
        )
      } ) }
    </div>
  )
}