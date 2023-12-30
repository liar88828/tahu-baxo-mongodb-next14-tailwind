type TProduct = {
  id: string
  nama: string,
  lokasi: string,
  harga: number,
  jumlah: number,
  jenis: "Orderan" | "Item" | string,
  keterangan: string,
  img: string
}


export type   TListCard = {
  id: string
  hpPenerima: string;
  penerima: string;
  alamatPenerima: string;
  //
  pesan: Date | string;
  waktuKirim: Date | string;
  pengirim: string;
  totalBayar: number;
  namaPengiriman: string;
  typePembayaran: string;
  status: string
  semuaProduct: TProduct[]
}

export type TSendDashboard = {
  semuaOrderTahun: TLines[],
  semuaProductNow: TDonat[],
  semuaProductLast: TDonat[],
  semuaStatus: TStatus[],
  notifyMonth: TListCard[] | any[],
  aggregate: TAggregate[]
}

export type TAggregate = {
  nama: string,
  total_jumlah_current: number,
  total_jumlah_last: number,
  total_jumlah_last_two: number,
  total_harga_current: number,
  total_harga_last: number
  total_harga_last_two: number

}

//untuk notif
export type TLine = {
  year: number,
  month: string,
  jumlah_pesanan: bigint
};

export type TDonat = {
  _count: {
    nama: number
  },
  nama: string
}

export type TStatus = {
  _count: {
    status: number
  },
  status: string,
}

export type TLines = {
  year: number,
  month: string,
  jumlah_pesanan: number
};

