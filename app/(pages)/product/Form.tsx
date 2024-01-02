"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { ToModel, TProduct } from '@/interface/model';
import { CreateZod } from '@/lib/validator/zod';
import { setIdProduct } from '@/lib/utils/setID';
import { notifyData } from '@/lib/utils/toast';
import { FormBody, FormButton, FormLayout, FormPrev } from '@/components/Form';
import { InputForm } from '@/components/elements/InputForm';
import { formProduct, } from '@/assets/model';
import { OpenButton, SubmitButton } from '@/components/elements/Buttons';
import { ImagePrev, LayoutImagePrev } from '@/components/Images';
import { zodResolver } from '@hookform/resolvers/zod';
import { img } from '@/assets/default';
import { url } from '@/lib/utils/url';

type TYPE = TProduct;

const sendData = async ( method: 'POST' | 'PUT', data: TProduct ) => {
  const res = await fetch( url + `/api/product?id=${ data.id }`, {
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

export default function FormProduct(
  { defaultData, method, to }:
    {
      defaultData: TYPE,
      method: "POST" | "PUT",
      to: ToModel
    }, ) {

  const router                                                       = useRouter()
  const [ imageUrl, setImageUrl ]                                    = useState<string>( defaultData.img );
  const [ open, setOpen ]                                            = useState<boolean>( false );
  const { getValues, register, handleSubmit, formState: { errors } } = useForm<TYPE>( {
    defaultValues: defaultData,
    mode         : "onChange",
    resolver     : zodResolver( CreateZod.ProductSchema )
  } );

  // console.log( errors )
  const handleImage = () => {
    setImageUrl( getValues().img );
    setOpen( prev => !prev )
  }

  const handleSave = async ( data: TYPE ) => {
    console.log( 'click' )
    setImageUrl( data.img )
    const text = method === "POST" ? "SIMPAN" : "EDIT"
    if( confirm( `Apakah anda yakin untuk ${ text } data ini ?` ) ) {
      try {
        console.log( "send data" )
        data.id = method === "POST" ? setIdProduct( data ) : data.id

        // const res = await Fetch( {
        //   to    : to,
        //   json  : data,
        //   method: method,
        //   id    : id
        // } )
        const res = await sendData( method, data )
        // console.log( res )
        if( res.success ) {
          notifyData( 'Success create data' )
          router.refresh()
          // router.replace( `/${ to }/list?page=1&take=10` )
          // router.prefetch( `/${ to }/list?page=1&take=10` )
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
  const dataTest   = method === 'POST' ? method : defaultData.nama

  return (
    <form onSubmit={ handleSubmit( handleSave ) }>
      <FormLayout>
        <FormBody>
          <InputForm method={ dataTest }
                     errors={ errors }
                     title={ formProduct.nama }
                     type="text"
                     reg={ register( "nama" ) }
          />

          <InputForm method={ dataTest }
                     errors={ errors }
                     title={ formProduct.harga }
                     type="number"
                     reg={ register( "harga", { valueAsNumber: true } ) }
          />

          <InputForm method={ dataTest }
                     errors={ errors }
                     title={ formProduct.lokasi }
                     type="text"
                     reg={ register( "lokasi" ) }
          />

          <InputForm method={ dataTest }
                     errors={ errors }
                     title={ formProduct.jenis }
                     type="text"
                     reg={ register( "jenis" ) }
          />

          <InputForm method={ dataTest }
                     errors={ errors }
                     title={ formProduct.keterangan }
                     type="textarea"
                     min={ 0 }
                     max={ 100 }
                     reg={ register( "keterangan" ) }
          />

          <InputForm method={ dataTest }
                     errors={ errors }
                     title={ formProduct.img }
                     type="textarea"
                     min={ 0 }
                     max={ 300 }
                     reg={ register( "img" ) }/>
          <FormButton>
            <OpenButton method={ method } fun={ () => handleImage() } states={ open }/>
            <SubmitButton method={ method }/>
          </FormButton>
        </FormBody>


        {/*<div className={ `${ open ? "block" : "hidden fixed" }` }>*/ }

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