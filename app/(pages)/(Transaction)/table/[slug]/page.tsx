import { TableOrder } from '@/app/(pages)/(Transaction)/table/Table';
import { DataEmpty } from '@/components/Errors';

// export const dynamic    = 'force-dynamic'
// export const revalidate = 0
// export const fetchCache = 'auto'
// export const runtime    = 'nodejs'

// type TDataRes<T> = {
//   msg: string,
//   data: T
// };

const getDataTabel = async ( id: string ) => {
  return fetch( `http://localhost:3000/api/table?id=${ id }&option=table`, {
    // method : 'GET',
    // headers: { 'Content-Type': "application/json" },
    cache: 'no-cache'
    // next: { tags: [ 'orderans' ] }
  } )

}
export default async function Page( { params: { slug } }: {
  params: {
    slug: string
  }
} ) {

  const res = await getDataTabel( slug )
  if( !res.ok ) {
    return <DataEmpty/>
  }
  else {
    console.info( `success fetch data orderan ${ slug }` )
  }

  const data = await res.json()
  // console.log(data)

 if( !data.success ) {
    return (
      <DataEmpty/>
    )
  }

  return ( <TableOrder dataOrderan={ data }/> )
}
