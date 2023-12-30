import { TBank, TDelivery, TOrder, TProduct } from '@/interface/model';
import { defaultDate } from '@/lib/utils/formatDate';

export const jpgTextNotFound = 'https://dummyimage.com/200x200/000/fff.jpg&text=not+found';
export const img = 'https://dummyimage.com/200x200/000/fff.jpg&text=not+found'

export const defaultFormProduct: TProduct = {
  id        : "",
  nama      : "",
  harga     : 0,
  lokasi    : "",
  jumlah    : 0,
  jenis     : "",
  img       : jpgTextNotFound,
  keterangan: ""
}


export const defaultFormTravel: TDelivery = {
  id        : "",
  nama  : "",
  hp        : "",
  lokasi: "",
  harga     : 0,
  jenis : "",
  img   : jpgTextNotFound,
  keterangan: ""
}


export const defaultFormBank: TBank = {
  hp        : "",
  nama      : "",
  no        : "",
  id        : "",
  lokasi: "",
  jenis : "",
  keterangan: "",
  img   : jpgTextNotFound
}

export const defaultFormOrderan: TOrder = {
  //data orang
  pengirim  : 'Kantor Tahu Baxo',
  hpPengirim: '',
  penerima  : '',
  dari      : '',
  alamatPenerima: '',
  hpPenerima: '',
  // waktu
  pesan: defaultDate(),
  // kirim     : defaultDate(),
  waktuKirim: defaultDate(),
  // product
  listOrderan: [],
  listItem   : [],
  semuaProduct: [],
  //keterangan
  // guna  : "Untuk apa ??",
  lokasi: "Semarang",
  //travel
  namaPengiriman: "",
  ongkir        : 0,
  //transaksi
  id            : "",
  typePembayaran: "CASH",
  totalBayar    : 0,
  totalPenjualan: 0,
  status        : 'Di terima',
  guna          : ""
}
