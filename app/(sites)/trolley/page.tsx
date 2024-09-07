import NavBottom from './NavBottom'
import { ProductList } from './ProductList'
import { getTrolleyPrisma } from "@/server/action/test";

export default async function page() {
  const data = await getTrolleyPrisma()
  if (!data) {
    return <h1>Trolley is not found</h1>
  }
  console.log(data)
  return (
    <>
      <div className='p-5 space-y-2 pb-52'>
        <ProductList
          userId={ data.userId }
          id={ 0 }
        />
        <NavBottom />
      </div>
    </>
  )
}
