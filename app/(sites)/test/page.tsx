'use client'
import { useCheckout } from "@/store/useCheckout";

function Page() {
  // const count = useSelector((state: RootState) => state.counter.value)
  // const delivery = useSelector((state: RootState) => state.delivery.value)
  // const dispatch = useDispatch<AppDispatch>()
  const { description, setPrice, setChange } = useCheckout()
  return <div>
    {/*<div className="">*/ }
    
    {/*<button*/ }
    {/*  className={ 'btn btn-info' }*/ }
    {/*  aria-label="Increment value"*/ }
    {/*  onClick={ () => setPrice({ shippingCost: 1 }) }*/ }
    {/*>*/ }
    {/*  Increment*/ }
    {/*</button>*/ }
    {/*  <span>{ description?.shippingCost }</span>*/ }
    {/*<button*/ }
    {/*  className={ 'btn btn-info' }*/ }
    {/*  aria-label="Decrement value"*/ }
    {/*  onClick={ () => setPrice({ shippingCost: 2 }) }*/ }
    {/*>*/ }
    {/*  Decrement*/ }
    {/*</button>*/ }
    {/*</div>*/ }
    
    { JSON.stringify(description) }
    <div className="">
      
      <button
        className={ 'btn btn-info' }
        aria-label="Increment value"
        onClick={ () => setChange({ shippingCost: 1 }) }
      >
        Increment
      </button>
      <span>{ description?.shippingCost }</span>
      <button
        className={ 'btn btn-info' }
        aria-label="Decrement value"
        onClick={ () => setChange({ shippingCost: 2 }) }
      
      >
        Decrement
      </button>
    </div>
  </div>
}

export default Page;
