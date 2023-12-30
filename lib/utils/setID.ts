// Travel
import { TBank, TDelivery, ToModel, TOrder, TProduct } from '@/interface/model';

export const setIdDelivery = ( dTravel: TDelivery ): string =>
  dTravel.nama.slice( 0, 2 ) + "_" +
  dTravel.harga.toString().slice( 0, 2 ) + "_" +
  dTravel.lokasi.slice( 0, 2 ) + "_" +
  dTravel.jenis.slice( 0, 2 ) + "_" +
  dTravel.keterangan.slice( 0, 2 ) + "_" + Date.now();

// product
export const setIdProduct = ( dProduct: TProduct ): string =>
  dProduct.nama.slice( 0, 2 ) + "_" +
  dProduct.harga.toString().slice( 0, 2 ) + "_" +
  dProduct.lokasi.slice( 0, 2 ) + "_" +
  dProduct.jenis.slice( 0, 2 ) + "_" +
  dProduct.keterangan.slice( 0, 2 ) + "_" + Date.now();

// product
export const setIdBank = ( dBank: TBank ): string =>
  dBank.nama.slice( 0, 2 ) + "_" +
  dBank.no.toString().slice( 0, 2 ) + "_" +
  dBank.hp.toString().slice( 0, 2 ) + "_" +
  dBank.lokasi.slice( 0, 2 ) + "_" +
  dBank.jenis.slice( 0, 2 ) + "_" +
  dBank.keterangan.slice( 0, 2 ) + "_" + Date.now();

// Orderan
function setIdOrderanString(
  dataBaru:   TOrder
) {
  function getNumbers( hpPenerima: string, hpPengirim: string, penerima: string ) {
    return hpPenerima + hpPengirim + penerima.length;
  }

  return dataBaru.penerima.slice( 0, 5 )
    + "_" +
    dataBaru.alamatPenerima.toString().slice( 0, 4 )
    + "_" +
    dataBaru.pesan.toString().slice( 2, 4 ) +
    dataBaru.pesan.toString().slice( 5, 7 ) +
    dataBaru.pesan.toString().slice( 8, 10 )
    + "_" +
    dataBaru.lokasi.toString().slice( 0, 3 )
    + "_" +
    getNumbers(
      dataBaru.hpPenerima,
      dataBaru.hpPengirim,
      dataBaru.penerima
    ).toString().slice( 0, 5 );
}

export const setIdOrderan = ( dataBaru: TOrder ): string =>
  setIdOrderanString( dataBaru ).replaceAll( " ", "_" )

export function setIdModel( to: ToModel, data: any ) {
  console.log( "gateway/setIdModel" )
  if( to === "bank" ) {
    return setIdBank( data );
  }
  if( to === "product" ) {
    return setIdProduct( data );
  }
  if( to === "delivery" ) {
    return setIdDelivery( data );
  }
  if( to === "orderan" ) {
    console.log( data )
    return setIdOrderan( data );
  }
  if( to === "semuaProduk" ) {
    console.log( data )
    return setIdProduct( data );
  }
}

