"use client"
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import PopUp from '@/app/(pages)/(Transaction)/orderan/PopUp';
import { ProductOrderan, TBank, TDelivery, TOrder } from '@/interface/model';
import { getSchema } from '@/lib/validator/zod';
import { defaultFormOrderan } from '@/assets/default';
import Penerima from '@/app/(pages)/(Transaction)/orderan/Penerima';
import Pengirim from '@/app/(pages)/(Transaction)/orderan/Pengirim';
import Waktu from '@/app/(pages)/(Transaction)/orderan/Waktu';
import Product from '@/app/(pages)/(Transaction)/orderan/Product';

export default function FormOrderan( {
  id = "",
  method,
  defaultDataOrder,
  product,
  travel,
  bank
}: {
  id: string,
  method: "POST" | "PUT",
  defaultDataOrder: TOrder,
  travel: Pick<TDelivery, "nama">[],
  product: ProductOrderan[]
  bank: Pick<TBank, "nama">[]
} ) {
  const methods                                                     = useForm<TOrder>( {
    defaultValues: defaultDataOrder,
    mode         : "onChange",
    resolver     : zodResolver( getSchema( method, 'ORDERAN' ) )
  } );
  const { handleSubmit, formState: { errors, isSubmitted }, reset } = methods
  console.log( errors )

  const [ valueForm, setValueForm ]     = useState<TOrder>( defaultFormOrderan )
  const onSubmit: SubmitHandler<TOrder> = ( data ) => {
    // console.log( data )
    setValueForm( data )
  };

  return ( <form onSubmit={ handleSubmit( onSubmit ) }>

    <div className="flex flex-col sm:flex-row  sm:gap-3 mt-5">
      <FormProvider { ...methods } >
        <div className={ 'bg-white flex-col flex sm:w-[48%]  md:w-[49%] ml-2 gap-3 rounded p-2 sm:p-5' }>
          <Penerima/>
          <Pengirim travel={ travel } bank={ bank }/>
        </div>
        <div className={ 'bg-white flex-col flex sm:w-[48%]  md:w-[49%] ml-2 gap-3 rounded p-2 sm:p-5' }>
          <Product product={ product }/>
          <Waktu/>
          <button type="submit"
                  data-test={ 'button-submit' }
                  className={ "btn btn-success text-white w-full" }>
            Add Product
          </button>

          { isSubmitted && <PopUp
            key={ 'popup_orderan' }
            data={ valueForm }
            id={ id }
            method={ method }
          /> }

          { isSubmitted &&
            <button className={ "btn btn-error text-white" }
                    onClick={ () => reset( defaultFormOrderan ) }
                    type="button">Reset</button> }

        </div>
      </FormProvider>

    </div>
  </form> )
}

