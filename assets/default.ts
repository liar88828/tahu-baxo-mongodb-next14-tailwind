import type { TBank, TDelivery, TOrder, TProduct, } from "../interface/model/model"

export const jpgTextNotFound =
  "https://dummyimage.com/200x200/000/fff.jpg&text=not+found"
export const img = "https://dummyimage.com/200x200/000/fff.jpg&text=not+found"

export const defaultFormProduct: TProduct = {
  id: "",
  nama: "",
  harga: 0,
  lokasi: "",
  jumlah: 0,
  jenis: "",
  img: jpgTextNotFound,
  keterangan: "",
}

export const defaultFormDelivery: TDelivery = {
  id: "",
  nama: "",
  hp: "",
  lokasi: "",
  harga: 0,
  jenis: "",
  img: jpgTextNotFound,
  keterangan: "",
}

export const defaultFormBank: TBank = {
  hp: "",
  nama: "",
  no: "",
  id: "",
  lokasi: "",
  jenis: "",
  keterangan: "",
  img: jpgTextNotFound,
}

export const defaultFormOrderan: TOrder = {
  //data orang
  pengirim: "Kantor Tahu Baxo",
  hpPengirim: "",
  penerima: "",
  dari: "",
  alamatPenerima: "",
  hpPenerima: "",
  // waktu
  pesan: new Date(),
  waktuKirim: new Date(),
  // product
  listOrderan: [],
  listItem: [],
  semuaProduct: [],
  //keterangan
  // guna  : "Untuk apa ??",
  lokasi: "Semarang",
  //travel
  namaPengiriman: "",
  ongkir: 0,
  //transaksi
  id: "",
  typePembayaran: "CASH",
  totalBayar: 0,
  totalPenjualan: 0,
  status: "Terima",
  guna: "",
}
