import type { TBank, TDelivery, TOrder, TProduct, } from "../interface/model/model"

export const formProduct: Record<keyof TProduct, any> = {
	id: "",
	nama: "Nama Produk",
	harga: "Harga Produk",
	lokasi: "Lokasi Produk",
	jumlah: "Masukan Jumlah",
	jenis: "Jenis Produk",
	img: "Gambar Produk",
	keterangan: "Keterangan Produk",
}
export const formTravel: Record<keyof TDelivery, any> = {
	id: "",
  nama: "Nama Travel",
	hp: "No Hp perusahaan",
	lokasi: "Lokasi ",
	jenis: "Jenis Pengiriman",
	harga: "Kisaran Biaya Pengiriman",
	img: "Logo Travel",
	keterangan: "Keterangan ",
}

export const formOrderan: Record<keyof TOrder, any> = {
	id: "id",
	totalBayar: "totalBayar",
	totalPenjualan: "totalPenjualan",
	status: "Status",
	guna: "Keterangan",
	listOrderan: "listOrderan",
	listItem: "listItem",
  //--- product
	semuaProduct: "semuaProduct",
  //--- Pengirim
	pengirim: "Pengirim",
	hpPengirim: "Hp Pengirim",
  namaPengiriman: "Delivery",
	ongkir: "Harga Ongkir",
	lokasi: "Lokasi",
	typePembayaran: "Pembayaran",
  // ---penerima
	penerima: "Penerima",
	dari: "Dari",
	alamatPenerima: "Alamat Penerima",
	hpPenerima: "Hp Penerima",
  // ---waktu
	pesan: "Pesan",
	waktuKirim: "Waktu Kirim",
}
export const formBank: Record<keyof TBank, any> = {
	hp: "No Telephone Perusahaan",
	nama: "Nama Bank",
	no: "No Rekening",
  id: "",
	lokasi: "Lokasi Bank",
	jenis: "Jenis Bank",
  keterangan: "Keterangan",
	img: "URL Gambar Logo perusahaan ",
}
