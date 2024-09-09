import NavBottom from './NavBottom'
import { ProductList } from './ProductList'

export default async function page() {
	
	return (
    <>
      <div className='p-5 space-y-2 pb-52'>
				<ProductList/>
        <NavBottom />
      </div>
    </>
  )
}
