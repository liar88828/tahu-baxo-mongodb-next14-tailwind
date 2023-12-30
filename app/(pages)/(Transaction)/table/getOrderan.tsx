import { CellContext, HeaderContext } from '@tanstack/table-core';
import { TCREATEORDERAN, TCREATEPRODUCTSEMUA } from '@/lib/validator/zod';
import { Rupiah } from '@/lib/utils/formatMoney';

export function getOrderan(
  header: string,
  lokasi: [ "semarang", "ungaran" ],
  jenis: [ "orderan", "item" ]
) {

  function cellData(
    info: CellContext<{
      semuaProduct: TCREATEPRODUCTSEMUA[];
      pesan: Date | string;
      // kirim: Date | string;
      waktuKirim: Date | string
    } & TCREATEPRODUCTSEMUA, any>,
    lok: string
  ) {
    return info.getValue()
               .filter( ( j: TCREATEPRODUCTSEMUA ) => {
                 const namas   = j.nama.includes( header )
                 const jeniss  = j.jenis.toLowerCase().includes( jenis[ 0 ] )
                 const lokasis = j.lokasi.toLowerCase().includes( lok )
                 return namas && jeniss && lokasis
               } )
               .map( ( d: TCREATEPRODUCTSEMUA ) => ( <p key={ d.id }>{ d.jumlah }</p> ) );
  }

  function footerData(
    props: HeaderContext<TCREATEORDERAN, any>,
    lok: string,
    parent: string = ""
  ) {
    function getNumber(
      m: {
        semuaProduct: TCREATEPRODUCTSEMUA[]|any[];
        pesan: Date | string;
        // kirim: Date | string;
        waktuKirim: Date | string
      } & TCREATEPRODUCTSEMUA,
      option: "harga" | "jumlah"
    ) {
      return m.semuaProduct
              .filter( ( f ) => {
                const namas   = f.nama.includes( header )
                const jeniss  = f.jenis.toLowerCase().includes( jenis[ 0 ] )
                const lokasis = f.lokasi.toLowerCase().includes( lok )
                if( parent === "parent" ) {
                  return jeniss && namas
                }

                return jeniss && namas && lokasis
              } )
              .map( m => {
                if( option === "jumlah" ) return m.jumlah
                if( option === "harga" ) return m.harga
                return 0
              } )
              .reduce( ( a, d ) => a + d, 0 );
    }

    const jumlah = props.table.getRowModel().rows
                        .map( m => m.original )
                        .map( m => getNumber( m as any, "jumlah" )
                        ).reduce( ( a, d ) => a + d, 0 )

    if( parent === "parent" ) {
      const harga = props.table.getRowModel().rows
                         .map( m => m.original )
                         .map( m => getNumber( m as any, "harga" )
                         ).reduce( ( a, d ) => a + d, 0 )
      return ` ${ Rupiah( harga * jumlah ) }`
    }
    return jumlah

  }

  return {
    header: header,
    footer: ( props: HeaderContext<TCREATEORDERAN, any> ) => footerData( props, lokasi[ 1 ], "parent" ),

    columns:
      [
        {
          accessorKey: 'semuaProduct',
          header     : 'UNG',
          cell       : ( info: CellContext<TCREATEORDERAN, any> ) => cellData( info as any, lokasi[ 1 ] ),
          footer     : ( props: HeaderContext<TCREATEORDERAN, any> ) => footerData( props, lokasi[ 1 ], "" ),

        },
        {
          accessorKey: 'semuaProduct',
          header     : 'SMG',
          cell       : ( info: CellContext<TCREATEORDERAN, any> ) => cellData( info as any, lokasi[ 0 ] ),
          footer     : ( props: HeaderContext<TCREATEORDERAN, any> ) => footerData( props, lokasi[ 0 ] ),
        }
      ],
  };
}