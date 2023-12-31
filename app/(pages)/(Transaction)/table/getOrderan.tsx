'use client'
import { CellContext, HeaderContext } from '@tanstack/table-core';
import { TCREATEORDERAN, TCREATEPRODUCTSEMUA } from '@/lib/validator/zod';
import { Rupiah } from '@/lib/utils/formatMoney';

interface ProductInfo extends TCREATEPRODUCTSEMUA {
  waktuKirim: Date | string;
}

export function getOrderan(
  header: string,
  lokasi: [ "semarang", "ungaran" ],
  jenis: [ "orderan", "item" ]
) {

  function filterProduct( info: ProductInfo[], lok: string ) {
    return info
    .filter( ( j ) => {
      const namas   = j.nama.includes( header );
      const jeniss  = j.jenis.toLowerCase().includes( jenis[ 0 ] );
      const lokasis = j.lokasi.toLowerCase().includes( lok );
      return namas && jeniss && lokasis;
    } )
    .map( ( d ) => <p key={ d.id }>{ d.jumlah }</p> );
  }

  function calculateNumber(
    products: ProductInfo[],
    lok: string,
    option: "harga" | "jumlah",
    isParent: boolean
  ) {
    return products
    .filter( ( f ) => {
      const namas   = f.nama.includes( header );
      const jeniss  = f.jenis.toLowerCase().includes( jenis[ 0 ] );
      const lokasis = f.lokasi.toLowerCase().includes( lok );
      return isParent ? jeniss && namas : jeniss && namas && lokasis;
    } )
    .map( ( m ) => ( option === "jumlah" ? m.jumlah : option === "harga" ? m.harga : 0 ) )
    .reduce( ( a, d ) => a + d, 0 );
  }

  function calculateFooterData(
    props: HeaderContext<TCREATEORDERAN, any>,
    location: string,
    parent: boolean = false
  ) {
    const allProducts = props.table.getRowModel().rows.map( ( m ) => m.original );
    const totalJumlah = allProducts
    .map( ( m ) => calculateNumber( m.semuaProduct as ProductInfo[], location, "jumlah", parent ) )
    .reduce( ( a, d ) => a + d, 0 );

    if( parent ) {
      const totalHarga = allProducts
      .map( ( m ) => calculateNumber( m.semuaProduct as ProductInfo[], location, "harga", parent ) )
      .reduce( ( a, d ) => a + d, 0 );

      return ` ${ Rupiah( totalHarga * totalJumlah ) }`;
    }

    return totalJumlah;
  }

  return {
    header: header,
    footer: ( props: HeaderContext<TCREATEORDERAN, any> ) =>
      calculateFooterData( props, lokasi[ 1 ], true ),

    columns: [
      {
        accessorKey: 'semuaProduct',
        header     : 'UNG',
        cell       : ( info: CellContext<TCREATEORDERAN, any> ) => filterProduct( info.getValue() as ProductInfo[], lokasi[ 1 ] ),
        footer     : ( props: HeaderContext<TCREATEORDERAN, any> ) => calculateFooterData( props, lokasi[ 1 ] ),
      },
      {
        accessorKey: 'semuaProduct',
        header     : 'SMG',
        cell       : ( info: CellContext<TCREATEORDERAN, any> ) => filterProduct( info.getValue() as ProductInfo[], lokasi[ 0 ] ),
        footer     : ( props: HeaderContext<TCREATEORDERAN, any> ) => calculateFooterData( props, lokasi[ 0 ] ),
      },
    ],
  };
}
