'use client'

import React from 'react';
import Horizon from '@/components/elements/Horizon';
import { InputForm } from '@/components/elements/InputForm';
import { formOrderan } from '@/assets/model';
import { TBank, TDelivery } from '@/interface/model';
import { useFormContext } from 'react-hook-form';

function Pengirim({travel,bank}: {
  travel:Pick<TDelivery, "nama">[],
  bank: Pick<TBank, "nama">[]

}   ) {
  const { register, formState: { errors }, } = useFormContext();

  return (
    <>
      <Horizon text={ 'Pengirim' }/>
      <InputForm errors={ errors } title={ formOrderan.pengirim } type="text" reg={ register( "pengirim" ) }/>
      <InputForm errors={ errors } title={ formOrderan.hpPengirim } type={ "number" }
                 reg={ register( "hpPengirim" ) }/>

      {/*-----------*/ }
      <label htmlFor="namaPengiriman"
             className={ 'text-black mb-1 capitalize' }>{ formOrderan.namaPengiriman }</label>
      <select
        id={ "namaPengiriman" }
        data-test={ formOrderan.namaPengiriman }
        className='bg-gray-50  border border-gray-300 p-2 rounded-md'{ ...register( "namaPengiriman" ) }>
        { travel.map( ( t, i ) => ( <option key={ `${ t.nama + i }` } value={ t.nama }>{ t.nama }</option> ) ) }
      </select>

      <InputForm errors={ errors } tag={ 'input' } title={ formOrderan.ongkir } type={ "number" }
                 reg={ register( "ongkir", { valueAsNumber: true } ) }/>
      <label htmlFor="lokasi"
             className={ 'text-black mb-1 capitalize' }>{ formOrderan.lokasi }</label>
      <select id={ "lokasi" }
              data-test={ formOrderan.lokasi }
              className='bg-gray-50 border border-gray-300 p-2 rounded-md'{ ...register( "lokasi" ) }>
        <option value="Ungaran">Ungaran</option>
        <option value="Semarang">Semarang</option>
      </select>

      <label htmlFor="typePembayaran"
             className={ 'text-black mb-1 capitalize' }>{ formOrderan.typePembayaran }</label>
      <select
        id={ "typePembayaran" }
        data-test={ formOrderan.typePembayaran }
        className='bg-gray-50 border border-gray-300 p-2 rounded-md'{ ...register( "typePembayaran" ) }>
        { bank.map( ( b: Pick<TBank, "nama">, i ) => (
          <option value={ b.nama } key={ `${ b.nama + i }` }>{ b.nama }</option>
        ) ) }
      </select>
    </>

  );
}

export default Pengirim;