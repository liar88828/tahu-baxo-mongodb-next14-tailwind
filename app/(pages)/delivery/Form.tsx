"use client"
import React, { useState } from 'react';
import { TDelivery, ToModel } from '@/interface/model';
import { zodResolver } from '@hookform/resolvers/zod';
import { getSchema } from '@/lib/validator/zod';
import { setIdDelivery } from '@/lib/utils/setID';
import { notifyData } from '@/lib/utils/toast';
import { FormBody, FormButton, FormLayout, FormPrev } from '@/components/Form';
import { InputForm } from '@/components/elements/InputForm';
import { formBank, formTravel } from '@/assets/model';
import { OpenButton, SubmitButton } from '@/components/elements/Buttons';
import { ImagePrev, LayoutImagePrev } from '@/components/Images';
import { img } from '@/assets/default';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { url } from '@/lib/utils/url';

const sendData = async ( method: 'POST' | 'PUT', data: TDelivery ) => {
  const res = await fetch( url + `/api/delivery?id=${data.id}`, {
    method,
    // next   : { tags: [ 'bank' ] },
    headers: { 'Content-Type': 'application/json' },
    body   : JSON.stringify( data )
  } )
  if( !res.ok ) {
    throw new Error( 'Error sending data' )
  }
  return res.json()
}

export default function FormDeliver(
  { defaultData, method,  to }:
    {
      defaultData: TDelivery,
      method: "POST" | "PUT",
      to: ToModel
    }, ) {

  const router                                                       = useRouter()
  const [ imageUrl, setImageUrl ]                                    = useState<string>( defaultData.img );
  const [ open, setOpen ]                                            = useState<boolean>( false );
  const { getValues, register, handleSubmit, formState: { errors } } = useForm<TDelivery>( {
    defaultValues: defaultData,
    mode         : "onChange",
    resolver     : zodResolver( getSchema( method, 'DELIVERY' ) )
  } );

  // console.log( errors )
  const handleImage = () => {
    setImageUrl( getValues().img );
    setOpen( prev => !prev )
  }

  const handleSave = async ( data: TDelivery ) => {
    setImageUrl( data.img )
    const text = method === "POST" ? "SIMPAN" : "EDIT"
    if( confirm( `Apakah anda yakin untuk ${ text } data ini ?` ) ) {
      try {
        // console.log( "send data" )
        data.id   =method==='POST'? setIdDelivery( data ):data.id
        const res = await sendData( method, data )
        console.log( res )
        // console.log( "get gateway" )
        if( res.success ) {
          notifyData( 'success create data' )
          router.refresh()
          // router.prefetch( `/${ to }/list?page=1&take=10` )
          // router.replace( `/${ to }/list?page=1&take=10` )

        }
        else if( !res.success ) {
          // router.replace( `/${ to }/list?page=1&take=10` )
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

  return <form onSubmit={ handleSubmit( handleSave ) }>
    <FormLayout>
      <FormBody>
        <InputForm errors={ errors }
                   title={ formTravel.nama }
                   type="text"
                   reg={ register( "nama" ) }/>

        <InputForm errors={ errors }
                   title={ formTravel.hp }
                   type="tel"
                   reg={ register( "hp" ) }/>

        <InputForm errors={ errors }
                   title={ formTravel.lokasi }
                   type="text"
                   reg={ register( "lokasi" ) }/>

        <InputForm errors={ errors }
                   title={ formTravel.jenis }
                   type="text"
                   reg={ register( "jenis" ) }/>

        <InputForm errors={ errors }
                   title={ formTravel.harga }
                   type="number"
                   reg={ register( "harga",
                     { valueAsNumber: true } ) }/>

        <InputForm errors={ errors }
                   min={ 0 }
                   max={ 100 }
                   title={ formTravel.keterangan }
                   type="textarea"
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
}