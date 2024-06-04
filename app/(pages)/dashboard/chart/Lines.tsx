"use client"
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import {TLines} from '@/interface/dashboard';
import {Line} from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface IMonthOrder {
  January: number;
  February: number;
  March: number;
  April: number;
  May: number;
  June: number;
  July: number;
  August: number;
  September: number;
  October: number;
  November: number;
  December: number;
}

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
type TYear = { label: string, data: number[], borderColor: string, backgroundColor: string }[];
const monthOrder: IMonthOrder = {
  "January": 1,
  "February": 2,
  "March": 3,
  "April": 4,
  "May": 5,
  "June": 6,
  "July": 7,
  "August": 8,
  "September": 9,
  "October": 10,
  "November": 11,
  "December": 12
};
const options = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      // text: 'Jumlah Pembeli Perbulan Selama 3 Tahun',
      text: 'Jumlah Transaksi Tahun',
    },
  },
};

export default function Lines({dataKu}: {
  dataKu: TLines[]
}) {


  function mergeObjectsWithSameMonth(data: TLines[]) {
    const result: TLines[] = [];
    // console.log(data)
    data.forEach((item) => {

      const existingItem = result.find((d) => d.month === item.month);
      if (existingItem) {
        existingItem.jumlah_pesanan += item.jumlah_pesanan;
      } else {
        result.push({...item});
      }
    });

    return result;
  }

  const mergedData = mergeObjectsWithSameMonth(dataKu);
  // console.log(mergedData);
  const availableStatus = Array.from(new Set(mergedData.map(order => order.month)));
  const status = availableStatus.sort((a, b) => a - b);

  // console.log(status, 'data status')

  function getPerStatusByValue(status: string) {
    return dataKu.filter(((f) => f.status == status))
      .map(d => d.jumlah_pesanan);
  }

  const setDate = new Set(dataKu.map(order => order.month))
  const mapDate: number[] = Array.from(setDate)
  const myMonthWithNames = mapDate.map(monthNumber => monthNames[monthNumber - 1]);
  const year: TYear = []


  if (status[0]) {
    const year1 = {
      // label          : years[ 0 ].toString(),
      label: 'Terima',
      data: getPerStatusByValue('Terima'),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
    year.push(year1)
  }

  if (status[1]) {
    const year2 = {
      // label          : years[ 1 ].toString(),
      label: 'Proses',
      data: getPerStatusByValue('Proses'),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    }
    year.push(year2)
  }

  if (status[2]) {
    const year3 = {
      // label          : years[ 2 ].toString(),
      label: 'Selesai',
      data: getPerStatusByValue('Selesai'),
      borderColor: 'rgb(126,235,53)',
      backgroundColor: 'rgba(116,255,98,0.5)',
    }
    year.push(year3)
  }
  const data = {
    labels: myMonthWithNames,
    datasets: year,

  }
  // console.log(mapDate,'mapDate')
  // console.log(setDate,'set Date')
  // console.log(sortedAvailableMonths, 'sortedAvailableMonths')
  // console.log( getPerStatusByValue('Terima'),'terima')
  // console.log(myMonthWithNames);
  // console.log(year)
  return <Line options={options} data={data}/>;
  // <h1>hai</h1>

  // <Line options={ options } data={ data }/>;
}
