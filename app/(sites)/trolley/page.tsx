import NavBottom from './NavBottom'
import { Product } from './Product'

export default async function page() {
	
	return (
    <>
      <div className='p-5 space-y-2 pb-52'>
				<Product/>
        <NavBottom />
      </div>
    </>
  )
}
