const btnS      = " btn text-white shadow "
export type  TStatusProduct = "Terima" | "Proses" | "Semua" | "Kirim" | "Selesai" | string

export const OStatus = [
  { s: "Terima" },
  { s: "Proses" },
  { s: "Kirim" },
  { s: "Selesai" }
]

// export const Status = ( s: TStatusProduk ): string => {
//   return ( s === "Terima" ) ? SDiTerima :
//          ( s === "Proses" ) ? SProcess :
//          ( s === "Kirim" ) ? SKirim : SSelesai
// }

export const statusWarna = (s: TStatusProduct): string => {
  return ( s === "Terima" ) ? " bg-error " :
         ( s === "Proses" ) ? " bg-info " :
         ( s === "Kirim" ) ? " bg-warning " :
         " bg-success "
}