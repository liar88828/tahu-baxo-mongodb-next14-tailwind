'use client'

import React from 'react';
import Horizon from '@/components/elements/Horizon';
import { InputForm } from '@/components/elements/InputForm';
import { formOrderan } from '@/assets/model';
import { useFormContext } from 'react-hook-form';
import { currentMonth, currentYear } from '@/lib/utils/formatDate';
import { statusWarna } from '@/app/style/status';
// import { Status } from '@/app/style/status';

function Waktu() {
  const { register, formState: { errors }, } = useFormContext();
  return (
    <>
      <Horizon text={ 'Waktu' }/>
      <InputForm errors={ errors } tag={ "input" } title={ formOrderan.pesan } type={ "date" }
                 min={ `${ currentYear }-${ currentMonth }-01` }
                 max={ `${ currentYear }-${ currentMonth + 1 }-31` }
                 reg={ register( "pesan" ) }
      />

      <InputForm errors={ errors } tag={ "input" } title={ formOrderan.waktuKirim } type={ "datetime-local" }
                 reg={ register( "waktuKirim", ) }
      />
      <InputForm errors={ errors } tag={ "textarea" } title={ formOrderan.guna } type={ "textarea" }
                 max={ 100 } min={ 0 } reg={ register( "guna" ) }/>

      <label htmlFor="status"
             className={ 'text-black mb-1 capitalize' }>{ formOrderan.status }</label>
      <select id="status" defaultValue={ "Terima" }
              data-test={ formOrderan.status }
              className='bg-gray-50 border border-gray-300 p-2 rounded-md'{ ...register( "status" ) }>
        {/*/status/*/ }
        <option className={ statusWarna( "Terima" ) } value="Terima">Terima</option>
        <option className={ statusWarna( "Proses" ) } value='Proses'>Proses</option>
        <option className={ statusWarna( "Kirim" ) } value="Kirim">Kirim</option>
        <option className={ statusWarna( "Selesai" ) } value="Selesai"> Selesai</option>
      </select>
    </>

  );
}

export default Waktu;