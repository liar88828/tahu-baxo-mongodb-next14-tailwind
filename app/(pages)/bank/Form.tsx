"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { CreateZod } from '@/lib/validator/zod';
import { notifyData } from '@/lib/utils/toast';
import { FormBody, FormButton, FormLayout, FormPrev } from '@/components/Form';
import { InputForm } from '@/components/elements/InputForm';
import { formBank, } from '@/assets/model';
import { OpenButton, SubmitButton } from '@/components/elements/Buttons';
import { ImagePrev, LayoutImagePrev } from '@/components/Images';
import { zodResolver } from '@hookform/resolvers/zod';
import { img } from '@/assets/default';
import { TBank } from '@/interface/model';
import { setIdBank } from '@/lib/utils/setID';
import { url } from '@/lib/utils/url';
import { revalidateTag } from 'next/cache';

type TYPE = TBank;

const sendBank = async ( method: 'POST' | 'PUT', data: TBank ) => {
  const res = await fetch( url + `/api/bank?id=${ data.id }`, {
    method,
    next   : { tags: [ 'bank' ] },
    headers: { 'Content-Type': 'application/json' },
    body   : JSON.stringify( data )
  } )
  if( !res.ok ) {
    throw new Error( 'Error sending data' )
  }
  return res.json()
}

export default function FormBank(
  { defaultData, method, to }:
    {
      defaultData: TYPE,
      method: "POST" | "PUT",
      to: "bank"
    }, ) {
  // console.log( defaultData )

  const router                                                       = useRouter()
  const [ imageUrl, setImageUrl ]                                    = useState<string>( defaultData.img );
  const [ open, setOpen ]                                            = useState<boolean>( false );
  const { getValues, register, handleSubmit, formState: { errors } } = useForm<TYPE>( {
    defaultValues: defaultData,
    mode         : "onChange",
    resolver     : zodResolver( CreateZod.BankSchema )
  } );

  // console.log( errors )
  const handleImage = () => {
    setImageUrl( getValues().img );
    setOpen( prev => !prev )
  }

  const handleSave = async ( data: TYPE ) => {
    setImageUrl( data.img )
    const text = method === "POST" ? "SIMPAN" : "EDIT"
    if( confirm( `Apakah anda yakin untuk ${ text } data ini ?` ) ) {
      try {
        // console.log( "send data" )
        data.id = method === 'POST' ? setIdBank( data ) : data.id
        console.log( 'send Data bank' )
        const res = await sendBank( method, data )
        console.log( "get response bank" )
        if( res.success ) {
          // revalidateTag('banks')
          notifyData( 'success create data' )
          // revalidateTag( 'bank' )
          router.refresh()
        }
        else if( !res.success ) {
          notifyData( res.msg )
        }
      }
      catch ( e ) {
        console.log( e )
        notifyData( "error" )
      }
    }
    else {
      notifyData( `Batal ${ text }` )
    }
  }

  return (
    <form onSubmit={ handleSubmit( handleSave ) }>
      <FormLayout>
        <FormBody>
          <InputForm errors={ errors }
                     title={ formBank.nama }
                     type="text"
                     reg={ register( "nama" ) }/>

          <InputForm errors={ errors }
                     title={ formBank.lokasi }
                     type="text"
                     reg={ register( "lokasi" ) }/>

          <InputForm errors={ errors }
                     title={ formBank.jenis }
                     type="text"
                     reg={ register( "jenis" ) }/>

          <InputForm errors={ errors }
                     title={ formBank.hp }
                     type="tel"
                     reg={ register( "hp" ) }/>

          <InputForm errors={ errors }
                     title={ formBank.no }
                     type="number"
                     reg={ register( "no" ) }/>

          <InputForm errors={ errors }
                     tag={ "textarea" } title={ formBank.keterangan }
                     type="textarea"
                     min={ 0 }
                     max={ 100 }
                     reg={ register( "keterangan" ) }/>

          <InputForm errors={ errors }
                     title={ formBank.img }
                     type="text"
                     min={ 0 }
                     max={ 300 }
                     reg={ register( "img" ) }/>
          <FormButton>
            <OpenButton method={ method } fun={ () => handleImage() } states={ open }/>
            <SubmitButton method={ method }/>
          </FormButton>
        </FormBody>

        <FormPrev>
          { open &&
            <LayoutImagePrev text={ to }>
              { !imageUrl && <h1>Upload Image</h1> }
              { imageUrl &&
                // eslint-disable-next-line @next/next/no-img-element
                <ImagePrev src={ defaultData.img === "" ? img : imageUrl }/>
              }
            </LayoutImagePrev>
          }
        </FormPrev>
      </FormLayout>
    </form>

  )
}

