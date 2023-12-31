'use client'
import React, { ChangeEvent, useState } from 'react';
import Horizon from '@/components/elements/Horizon';
import { Icon } from '@iconify/react';
import { ProductOrderan, TOrder } from '@/interface/model';
import CardLists from '@/components/Card';
import CardTrolley from '@/app/(pages)/(Transaction)/orderan/cardTrolley';
import { useFieldArray, useFormContext } from 'react-hook-form';

function Product( { product }: {
  product: ProductOrderan[]
} ) {
  const { control, register, } = useFormContext<TOrder>();

  const { fields, append, remove} = useFieldArray( {
    control,
    name : "semuaProduct",
    rules: { required: "Please append at last 1 ", },
    keyName: 'id',


  } );

  // fields.map(d=>{
  //   d.
  // })

  // console.log(fields)

  const [ cart, setCart ]                   = useState<TOrder["semuaProduct"]>( fields );
  const [ filteredItems, setFilteredItems ] = useState<TOrder["semuaProduct"]>( fields );

  const [ cariProduct, setCariProduct ]     = useState<boolean>( false )
  const [ searchQuery, setSearchQuery ]     = useState( '' );
  const handleSearchChange                  = ( event: ChangeEvent<HTMLInputElement> ) => {
    setSearchQuery( event.target.value );
    const filtered = product.filter(
      ( item ) => {
        return (
          item.nama.toLowerCase().includes( searchQuery.toLowerCase() ) ||
          item.harga.toString().includes( searchQuery.toLowerCase() ) )
      }
    );
    setFilteredItems( filtered );
  };

  const isItemAdded = ( item: ProductOrderan ) => cart.some( ( cartItem: ProductOrderan ) => cartItem.nama ===
    item.nama )

  const addToCart = ( item: ProductOrderan ) => {
    const isItemInCart = fields.some( ( cartItem ) => cartItem.nama ===
      item.nama )
    if( isItemInCart ) {
      alert( `Item "${ item.nama }" is already in the cart.` );
      setFilteredItems( ( prevItems: ProductOrderan[] ) => prevItems.filter( ( listItem ) => listItem.nama !==
        item.nama ) );
      remove( fields.length )
      return;
    }

    setCart( ( prevCart: ProductOrderan[] ) => [ ...prevCart, item ] );
    setFilteredItems( ( prevItems: ProductOrderan[] ) => prevItems
    .filter( ( listItem ) => listItem.nama !==
      item.nama ) );
  };

  const removeFromCart = ( item: ProductOrderan ) => {
    setCart( ( prevCart: ProductOrderan[] ) => prevCart.filter( ( cartItem ) => cartItem.nama !== item.nama ) );
    setFilteredItems( ( prevItems: ProductOrderan[] ) => [ ...prevItems, item ] );
  };

  return (
    <div className="flex flex-col gap-3">
      <Horizon text={ 'Produk' }/>

      <div className=" flex flex-row  gap-1 sm:gap-7 w-[100%] ">
        <button
          data-test={ 'close-open-button' }
          type={ 'button' }
          className={ !cariProduct ? " btn btn-error btn-square " : "btn btn-info btn-square " }
          onClick={ () => {setCariProduct( !cariProduct )} }>

          {/*<span className=" flex flex-row items-center px-4 justify-around ">*/ }
          <span>
                    { !cariProduct
                      ? <Icon icon="ic:baseline-close" color={ 'white' } width={ 20 } height={ 20 }/>
                      : <Icon icon="ic:sharp-search" color={ 'white' } width={ 20 } height={ 20 }/> }
                  </span>

        </button>
        <label htmlFor={ "cari" } className={ "w-full" }>

          <input
            data-test={ 'search-product' }
            name={ "cari" }
            id={ "cari" }
            className={ 'input input-bordered  w-full' }
            type="text"
            value={ searchQuery }
            placeholder={ " Cari Product" }
            onChange={ handleSearchChange }
            onClick={ () => {setCariProduct( false )} }/>
        </label>

      </div>

      {/*!-------------------------------------------------cariProduct----------------------------*/ }
      <div className={ ` ${ cariProduct || searchQuery.length < 1 ? " hidden "
                                                                  : " " } border border-gray-200 rounded bg-gray-50` }>
        <ul
          className={ " border-gray-300 border overflow-y-auto  h-[15rem] bg-gray-50 p-2 rounded " }>

          {
            filteredItems.length < 0
            ? ( <div>Data Kosong</div> )
            : filteredItems.map( ( item: ProductOrderan, i: number ) => (
              <CardLists i={ i } isItemAdded={ isItemAdded } item={ item } key={ `${ item.id + i }` }>
                <button
                  className={ " text-white btn-sm md:btn-md btn btn-info " }
                  type={ "button" }
                  data-test={ `product_${ i }` }
                  onClick={ () => {
                    append(
                      {
                        id    : item.id,
                        nama  : item.nama,
                        harga : item.harga,
                        lokasi: item.lokasi,
                        jumlah: 1,
                        jenis : item.jenis,
                        img   : item.img,
                      }
                    )
                    addToCart( item )
                  } }
                >
                  <Icon icon="ic:baseline-add"/>
                  <span className={ "ml-1 hidden md:hidden lg:block" }>Add</span>
                </button>
              </CardLists>
            ) ) }
        </ul>

      </div>

      {/*----------------------------------------------- -CART LIST-------------------------------------*/ }

      <div className="border border-gray-200 rounded bg-gray-50"
           onClick={ () => setCariProduct( true ) }>
        <ul className={ " border-gray-300 border overflow-y-auto   h-[15rem] bg-gray-50 p-2 rounded " }>
          {/*--------------------------------------------------------loop-------------------------*/ }
          { fields.length < 0
            ? ( <li>
              <div>Data Kosong</div>
            </li> )
            : fields.map( ( item: ProductOrderan, i: number ) => {
              return (
                <CardTrolley
                  key={ `${ item.id + i }` }
                  values={
                    <>
                      <label htmlFor={ `semuaProduct.${ i }.id` } hidden={ true }>
                        <input type={ 'hidden' } id={ `semuaProduct.${ i }.id` }
                               value={ item.id }{ ...register( `semuaProduct.${ i }.id`, { required: true } ) }/>
                      </label>

                      <label htmlFor={ `semuaProduct.${ i }.nama` } hidden={ true }>
                        <input type={ 'hidden' } id={ `semuaProduct.${ i }.nama` }
                               value={ item.nama }{ ...register( `semuaProduct.${ i }.nama`, { required: true } ) }/>
                      </label>

                      <label htmlFor={ `semuaProduct.${ i }.lokasi` } hidden={ true }>
                        <input type={ 'hidden' } id={ `semuaProduct.${ i }.lokasi` }
                               value={ item.lokasi }{ ...register( `semuaProduct.${ i }.lokasi`, { required: true } ) }/>
                      </label>

                      <label htmlFor={ `semuaProduct.${ i }.jenis` } hidden={ true }>
                        <input type={ 'hidden' } id={ `semuaProduct.${ i }.jenis` }
                               value={ item.jenis }{ ...register( `semuaProduct.${ i }.jenis`, { required: true } ) }/>
                      </label>

                      <label htmlFor={ `semuaProduct.${ i }.img` } hidden={ true }>
                        <input type={ 'hidden' } id={ `semuaProduct.${ i }.img` }
                               value={ item.img }{ ...register( `semuaProduct.${ i }.img`, { required: true } ) }/>
                      </label>

                      <label htmlFor={ `semuaProduct.${ i }.harga` } hidden={ true }>
                        <input type={ 'hidden' } id={ `semuaProduct.${ i }.harga` }
                               value={ item.harga }{ ...register( `semuaProduct.${ i }.harga`, { required: true } ) }/>
                      </label>
                    </>
                  }
                  actions={
                    <>
                      <label htmlFor={ `semuaProduct.${ i }.jumlah` } className={ " label " }>
                        <input
                          data-test={ 'jumlah-product' }
                          className={ "input input-primary w-full md:input-sm lg:input-md" }
                          type={ "number" }
                          min={ 1 }
                          defaultValue={ 1 }
                          id={ `semuaProduct.${ i }.jumlah` }
                          { ...register( `semuaProduct.${ i }.jumlah`,
                            { valueAsNumber: true } ) }
                        />
                      </label>

                      <button
                        data-test={ `trash-product_${ i }` }
                        className={ "text-white btn-sm md:btn-sm lg:btn-md btn btn-error w-full" }
                        type={ "button" }
                        onClick={ () => {
                          removeFromCart( item );
                          remove( i )
                        } }>
                        <Icon icon="ic:outline-close"/>
                        <span className="ml-1 hidden md:hidden lg:block">Hapus</span>
                      </button>
                    </>
                  } item={ item }/> )
            } ) }</ul>
      </div>
    </div>
  );
}

export default Product;