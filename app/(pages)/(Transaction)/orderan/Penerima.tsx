'use client'

import React from 'react';
import Horizon from '@/components/elements/Horizon';
import { InputForm } from '@/components/elements/InputForm';
import { formOrderan } from '@/assets/model';
import { useFormContext } from 'react-hook-form';

function Penerima() {
  const { register, formState: { errors }, } = useFormContext();
  return (
    <>
      <Horizon text={ 'Penerima' }/>
      <InputForm errors={ errors } title={ formOrderan.penerima } type={ "text" } reg={ register( "penerima" ) }/>
      <InputForm errors={ errors } title={ formOrderan.dari } type={ "text" } reg={ register( "dari" ) }/>
      <InputForm errors={ errors } title={ formOrderan.hpPenerima } type={ "tel" }
                 reg={ register( "hpPenerima" ) }/>
      <InputForm errors={ errors } title={ formOrderan.alamatPenerima } type={ "textarea" } tag={ "textarea" }
                 max={ 100 } min={ 0 } reg={ register( "alamatPenerima" ) }/>
    </>
  );
}

export default Penerima;