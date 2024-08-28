import {NextResponse} from "next/server";

export async function GET() {
  //                SELECT *
  //                FROM "Orderans"
  //                WHERE status = 'Terima';
  // ----
  // SELECT EXTRACT(MONTH FROM pesan) AS month,
  //   EXTRACT(YEAR FROM pesan) AS year,
  //   status,
  // COUNT(*) AS count
  // FROM "Orderans"
  // WHERE status IN ('Terima', 'Proses', 'Selesai')
  // GROUP BY year, month, status
  // ORDER BY year ASC, month ASC, status ASC;
  // ---
  //                SELECT EXTRACT(MONTH FROM pesan) AS month,
  //                  COUNT(*) AS count
  //                FROM "Orderans"
  //                WHERE status = 'Terima'
  //                  AND EXTRACT (YEAR FROM pesan) = EXTRACT (YEAR FROM CURRENT_DATE )-1
  //                GROUP BY month
  //                ORDER BY month;

//   const result = await prisma.$queryRaw`
//               SELECT
// --                   EXTRACT(YEAR FROM pesan) AS year,
// EXTRACT(MONTH FROM pesan) AS month,
//   status,
//   COUNT(*) AS jumlah_pesanan
//               FROM "Orderans"
//               WHERE status IN ('Terima', 'Proses', 'Selesai')
//               GROUP BY
// --                   EXTRACT (YEAR FROM pesan),
//                   EXTRACT (MONTH FROM pesan),
//                   status
//               ORDER BY
// --                   EXTRACT (YEAR FROM pesan),
//                   EXTRACT (MONTH FROM pesan),
//                   status;
//
//     `
//   ;
//   console.log(result)
  return NextResponse.json(
    // await dashboard.PenjualanDonat()
    // result
    ''
  )
}
