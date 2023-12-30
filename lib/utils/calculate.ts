import { ProductOrderan, TProduct } from '@/interface/model';

export let regExp: RegExp         = /^[a-zA-Z0-9.,_ ]+$/i;
export const calculateTotal       = ( array: ProductOrderan[] ) => array.reduce( ( acc, item ) => acc + item.harga *
  item.jumlah, 0 );

export const getSemuaHargaProduct = ( valueForm: { listOrderan: TProduct[]; listItem: TProduct[]; semuaProduct: TProduct[] }, calculateTotal: ( array: TProduct[] ) => number ) => {
  return valueForm.semuaProduct.length > 0 ? calculateTotal( valueForm.semuaProduct ) : 0;
}
