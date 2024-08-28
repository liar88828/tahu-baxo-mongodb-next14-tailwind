// import prisma from '@/lib/db/prisma';
// import {addDays, currentMonth, currentYear} from '@/lib/utils/formatDate';
// import {TStatusProduk} from '@/app/style/status';
// import {BarStatus, PenjualanTotalProdukBulanSekarang, TAggregate, TLine, TLines} from '@/interface/dashboard';
//
// class DashboardData extends Orderan {
//   async statusNotify() {
//     return prisma.orderanDB.groupBy({
//       by: ["status"],
//       _count: {status: true,},
//
//       // where: {
//       //   waktuKirim: {
//       //     gte: addDays(-30),
//       //   }
//       // }
//     })
//   }
//
//   async updateStatus(option: string, id: string,) {
//     return prisma.orderanDB.update({
//       where: {id: id},
//       data: {status: option}
//     })
//   }
//
//   async statusPesanan(status: TStatusProduk = "irim") {
//     return prisma.orderan.findMany({
//       where: {
//         status: {
//           contains: status
//         },
//         waktuKirim: {
//           gte: addDays(-30),
//         },
//       },
//       select: {
//         id: true,
//         penerima: true,
//         hpPenerima: true,
//         alamatPenerima: true,
//         pengirim: true,
//         namaPengiriman: true,
//         pesan: true,
//         status: true,
//         typePembayaran: true,
//         totalBayar: true,
//         waktuKirim: true,
//         semuaProduct: true
//
//       },
//       take: 100,
//     });
//   }
//
//   async semuaOrderTahun() {
//     const monthlyUserCounts: TLine[] = await prisma.$queryRaw`
//         SELECT EXTRACT(YEAR FROM pesan)  AS year,
//                EXTRACT(MONTH FROM pesan) AS month,
//                COUNT(*)                  AS jumlah_pesanan
//         FROM "Orderans"
//         WHERE EXTRACT(YEAR FROM pesan)
//                   BETWEEN EXTRACT(YEAR FROM CURRENT_DATE) - 3
//                   AND EXTRACT(YEAR FROM CURRENT_DATE)
//         GROUP BY EXTRACT(YEAR FROM pesan), EXTRACT(MONTH FROM pesan)
//         ORDER BY EXTRACT(YEAR FROM pesan), EXTRACT(MONTH FROM pesan);
//     `
//
//     const semuaOrderTahun: TLines[] | any[] = monthlyUserCounts.map((item) => ({
//       ...item,
//       jumlah_pesanan: Number(item.jumlah_pesanan)
//     }));
//     return semuaOrderTahun
//   }
//
//   async semuaProductLast() {
//     // console.log( currentYear, currentMonth, currentDate )
//     return prisma.semuaProduct.groupBy({
//         by: ["nama"],
//         _count: {nama: true},
//         where: {
//           created_at: {
//             gte: new Date(`${currentYear}-${currentMonth}-01`),
//             lte: new Date(`${currentYear}-${currentMonth}-30`),
//           }
//         },
//       }
//     )
//   }
//
//   async semuaProductNow() {
//     return prisma.semuaProduct.groupBy({
//         by: ["nama"],
//         _count: {nama: true,},
//         where: {
//           created_at: {
//             gte: addDays(-30),
//           }
//         },
//       }
//     )
//   }
//
//   async aggregateProductPerMonth() {
//     const aggregateProductPerMonth: TAggregate[] = await prisma.$queryRaw`
//         SELECT nama,
//                SUM(CASE
//                        WHEN EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM CURRENT_DATE) THEN jumlah
//                        ELSE 0 END) AS total_jumlah_current,
//                SUM(CASE
//                        WHEN EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM CURRENT_DATE) - 1 THEN jumlah
//                        ELSE 0 END) AS total_jumlah_last,
//                SUM(CASE
//                        WHEN EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM CURRENT_DATE) - 2 THEN jumlah
//                        ELSE 0 END) AS total_jumlah_last_two,
//                SUM(CASE
//                        WHEN EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM CURRENT_DATE) THEN harga
//                        ELSE 0 END) AS total_harga_current,
//                SUM(CASE
//                        WHEN EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM CURRENT_DATE) - 1 THEN harga
//                        ELSE 0 END) AS total_harga_last,
//                SUM(CASE
//                        WHEN EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM CURRENT_DATE) - 2 THEN harga
//                        ELSE 0 END) AS total_harga_last_two
//         FROM "SemuaProducts"
//         WHERE EXTRACT(MONTH FROM created_at) BETWEEN EXTRACT(MONTH FROM CURRENT_DATE) - 2 AND EXTRACT(MONTH FROM CURRENT_DATE)
//         GROUP BY nama;
//
//     `
//     const aggregate: TAggregate[] = aggregateProductPerMonth.map((item) => ({
//       ...item,
//       total_harga_current: Number(item.total_harga_current),
//       total_harga_last: Number(item.total_harga_last),
//       total_harga_last_two: Number(item.total_harga_last_two),
//       //
//       total_jumlah_current: Number(item.total_jumlah_current),
//       total_jumlah_last_two: Number(item.total_jumlah_last_two),
//       total_jumlah_last: Number(item.total_jumlah_last),
//     }));
//
//     return aggregate
//   }
//
//   async semuaOrderStatus() {
//     const OrderanStatus: TLine[] = await prisma.$queryRaw`
//         SELECT EXTRACT(MONTH FROM pesan) AS month,
//                status,
//                COUNT(*)                  AS jumlah_pesanan
//         FROM "Orderans"
//         WHERE status IN ('Terima', 'Proses', 'Selesai')
// --           AND EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM CURRENT_DATE)
//         GROUP BY EXTRACT(MONTH FROM pesan),
//                  status
//         ORDER BY EXTRACT(MONTH FROM pesan),
//                  status;
//     `
//     const StatusOrderan: TLines[] = OrderanStatus.map((item) => ({
//       ...item,
//       jumlah_pesanan: Number(item.jumlah_pesanan),
//       month: Number(item.month),
//     }));
//
//
//     return StatusOrderan
//   }
//
//
//   async productPerMonthStatus() {
//     const aggregateProductPerMonth: BarStatus[] = await prisma.$queryRaw`
//         SELECT nama,
//                SUM(CASE
//                        WHEN O.status = 'Terima'
// --                            AND EXTRACT(MONTH FROM O.created_at) = EXTRACT(MONTH FROM CURRENT_DATE)
//                            THEN jumlah
//                        ELSE 0 END) AS total_Terima,
//
//                SUM(CASE
//                        WHEN O.status = 'Proses'
// --                            AND EXTRACT(MONTH FROM O.created_at) = EXTRACT(MONTH FROM CURRENT_DATE)
//                            THEN jumlah
//                        ELSE 0 END) AS total_Proses,
//                SUM(CASE
//                        WHEN O.status = 'Selesai'
// --                            AND EXTRACT(MONTH FROM O.created_at) = EXTRACT(MONTH FROM CURRENT_DATE)
//                            THEN jumlah
//                        ELSE 0 END) AS total_Selesai,
//                SUM(CASE
//                        WHEN O.status = 'Terima'
// --                            AND EXTRACT(MONTH FROM O.created_at) = EXTRACT(MONTH FROM CURRENT_DATE)
//                            THEN harga
//                        ELSE 0 END) AS jumlah_Terima,
//                SUM(CASE
//                        WHEN O.status = 'Proses'
// --                            AND EXTRACT(MONTH FROM O.created_at) = EXTRACT(MONTH FROM CURRENT_DATE)
//                            THEN harga
//                        ELSE 0 END) AS jumlah_Proses,
//                SUM(CASE
//                        WHEN O.status = 'Selesai'
// --                            AND EXTRACT(MONTH FROM O.created_at) = EXTRACT(MONTH FROM CURRENT_DATE)
//                            THEN harga
//                        ELSE 0 END) AS jumlah_Selesai
//         FROM "SemuaProducts"
//                  JOIN public."Orderans" O
//                       on O.id = "SemuaProducts"."orderanId"
//
//         WHERE O.status IN ('Terima', 'Proses', 'Selesai')
//         GROUP BY nama;
//
//     `
//     // console.log(aggregateProductPerMonth)
//
//     const aggregate: BarStatus[] = aggregateProductPerMonth.map((item) => ({
//       ...item,
//       total_terima: Number(item.total_terima),
//       total_proses: Number(item.total_proses),
//       total_selesai: Number(item.total_selesai),
//       //
//       jumlah_terima: Number(item.jumlah_terima),
//       jumlah_proses: Number(item.jumlah_proses),
//       jumlah_selesai: Number(item.jumlah_selesai),
//     }));
//     // console.log(aggregate)
//     return aggregate
//   }
//
//
//   async PenjualanDonat() {
//     const penjualanTotalProdukBulanSekarang: PenjualanTotalProdukBulanSekarang[] = await prisma.$queryRaw`
//         SELECT nama,
//                SUM(CASE
//                        WHEN EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM CURRENT_DATE)
//                            THEN harga
//                        ELSE 0 END) AS harga_produk,
//                SUM(CASE
//                        WHEN EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM CURRENT_DATE)
//                            THEN jumlah
//                        ELSE 0 END) AS jumlah_produk
//
//
//         FROM "SemuaProducts"
//         GROUP BY nama;
//     `
//     // console.log(penjualanTotalProdukBulanSekarang)
//
//     const aggregate = penjualanTotalProdukBulanSekarang.map((item) => ({
//       ...item,
//       jumlah_produk: Number(item.jumlah_produk),
//       harga_produk: Number(item.harga_produk),
//       total: Number(item.jumlah_produk) * Number(item.harga_produk),
//
//     }));
//     // console.log(aggregate)
//     return aggregate
//   }
//
//
// }
//
// export const dashboard = new DashboardData()
