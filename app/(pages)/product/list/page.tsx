import ListProduct from '@/app/(pages)/product/Card';
import { Res, SearchParams, TProduct } from '@/interface/model';
import { UlCard } from '@/components/Card';
import Paginate from '@/components/elements/Pagination';
import { url } from '@/lib/utils/url';

const getData = async ( page: number, take: number ) => {
  return fetch( url + `/api/product?page=${ page }&take=${ take }`, { cache: 'no-store', } )
}
// export const revalidate = 0

export default async function Home( { searchParams }: SearchParams ) {
  const page = Number( searchParams.page )
  const take = Number( searchParams.take )
  // console.log(page,take)
  // const { data }: TRes<TProduct[]> = await Fetch(
  //   {
  //     method: "GET",
  //     to    : "product",
  //     page  : page,
  //     take  : take
  //   } )
  // const length =await prisma.product.count({take:100})

  // const [ data, length ] = await Promise.all( [
  //   prisma.product.findMany( { skip: ( page - 1 ) * take, take: take } ),
  //   prisma.product.count( { take: 100 } )
  // ] )

  const res = await getData( page, take )
  
  if( !res.ok ) {
    throw new Error( `Error! status: ${ res.status }` );
  }
  const { data }: Res<any> = await res.json()
  console.log( data )

  return ( <>
      <UlCard name={ "product" }>
        { data.res.map( ( d: TProduct ) => ( <ListProduct d={ d } key={ d.id } to={ 'product' }/> ) ) }
      </UlCard>
      <Paginate
        take={ take }
        page={ page }
        length={ data.count }
      />
    </>
  )
}
