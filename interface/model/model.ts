export type TMethod = "PUT" | "POST" | "GET" | "DELETE" | "PATCH";
export type TRes<T> = { msg: string, data: T }
export type ToModel = "table" | "bank" | "orderan" | "product" | "delivery" | "dashboard" | "semuaProduk";
export type Res<T> = {
  msg: 'Success GET',
  success: true,
  data: { res: T | any, count: 1 }
}

export type TProduct = {
  id: string
  nama: string,
  lokasi: string,
  harga: number,
  jumlah: number,
  jenis: "Orderan" | "Item" | string,
  keterangan: string,
  img: string,

}

export type SearchParams = { params: { id: string }, searchParams: { page?: string, take?: string, id?: string } };

export type TDelivery = {
  id: string,
  img: string,
  lokasi: string,
  nama: string,
  hp: string
  jenis: string,
  harga: number,
  keterangan: string,
}

export type TBank = {
  id: string
  hp: string
  no: string
  nama: string
  lokasi: string
  jenis: string
  keterangan: string
  img: string
}


type TOrderanData = {
  id?: string
  // data orang pengirim
  pengirim: string
  hpPengirim: string
  namaPengiriman: string
  ongkir: number
  // data orang pengirim
  penerima: string
  alamatPenerima: string
  hpPenerima: string
  dari: string
  guna: string
  lokasi: string
  //waktu
  pesan: Date | string
  waktuKirim: Date | string
  // kirim: Date | string
  //total
  typePembayaran: string
  totalBayar: number
  totalPenjualan: number,
  status: string
}
export type ProductOrderan = Omit<TProduct, 'keterangan'>


export type TOrder = {
  listOrderan: TProduct[ ]
  listItem: TProduct[ ]
  semuaProduct: ProductOrderan[]
} & TOrderanData
