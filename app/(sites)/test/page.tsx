'use client'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { decrement, increment } from "@/store/counter";

function Page() {
  const count = useSelector((state: RootState) => state.counter.value)
  const delivery = useSelector((state: RootState) => state.delivery.value)
  const dispatch = useDispatch<AppDispatch>()
  return <div>
    
    <button
      className={ 'btn btn-info' }
      aria-label="Increment value"
      onClick={ () => dispatch(increment()) }
    >
      Increment
    </button>
    <span>{ count }</span>
    <button
      className={ 'btn btn-info' }
      
      aria-label="Decrement value"
      onClick={ () => dispatch(decrement()) }
    >
      Decrement
    </button>
    { JSON.stringify(delivery) }
  </div>
}

export default Page;
