"use client"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Rupiah } from "@/lib/utils/formatMoney"
import { useTrolley } from "@/store/useTrolley";

export default function NavBottom() {
  const route = useRouter()
	const { totalTrolley, trolley } = useTrolley()
	const [rupiah, setRupiah] = useState<string>()
	// const { state } = useContext(ContextTrolley)
  // console.log(state)
	// let price = useCallback(
	//   () => state.trolleyMany.reduce((a, b) => a + b.Product.price * b.qty, 0),
	//   [state.trolleyMany]
	// )
	
	useEffect(() => {
		setRupiah(totalTrolley() ? Rupiah(totalTrolley()) : 'Rp0')
	}, [trolley])
  
  return (
		<div className="fixed bottom-0 right-0 left-0  px-2 border-t-2 rounded-t-xl pb-2 bg-base-100 ">
      {/*<div className='flex justify-between items-center p-2'>*/ }
      {/*  <h1 className='text-lg '>Promo</h1>*/ }
      {/*  <h1 className='text-lg font-bold'>Rp21312.23</h1>*/ }
      {/*</div>*/ }
      {/*<div className='flex justify-between items-center p-2'>*/ }
      {/*  <h1 className='text-lg '>Discount</h1>*/ }
      {/*  <h1 className='text-lg font-bold'>Rp21312.23</h1>*/ }
      {/*</div>*/ }
			<div className='flex justify-between items-center p-2 mb-2'>
				<h1 className='text-lg font-semibold'>Total</h1>
				<h1 className='text-lg font-bold'>{ rupiah }</h1>
			</div>
      <button
				onClick={ () => route.push("/checkout") }
				className="btn btn-primary w-full font-bold text-lg"
      >
				Checkout { rupiah }
      </button>
    </div>
  )
}
