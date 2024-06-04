"use client"
import React from 'react';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {BarStatus, TAggregate} from '@/interface/dashboard';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = ( title: string ) => {
  return {
    responsive         : true,
    maintainAspectRatio: true,

    plugins: {
      legend: {
        position: 'top' as const,
      },
      title : {
        display: true,
        text   : title,
      },
    },
  };
}
const setData        = ( a: BarStatus[] ) => {
  return {
    labels  : a.map( ( nama ) => nama.nama ),
    datasets: [
      {
        // label: `Bulan ${ getDates( 'month', 0 ) }`,
        label: `Terima`,
        data           : a.map( ( nama ) => nama.total_terima ),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        // label: `Bulan ${ getDates( 'month', -1 ) }`,
        label: `Proses`,
        data           : a.map( ( nama ) => nama.total_proses ),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        // label          : `Bulan ${ getDates( 'month', -2 ) }`,
        label          : `Selesai`,
        data           : a.map( ( nama ) => nama.total_selesai ),
        backgroundColor: 'rgba(116,255,98,0.5)',
      },
    ],
  };

}
const getData        = ( aggregate: BarStatus[] ) => {
  // console.log(addDays(-1))
  return { o: options( "Penjualan Produk Bulan" ), d: setData( aggregate ) }
}

export default function BarVertical( { data }: { data: BarStatus[] } ) {
  // console.log(aggregate)
  const { o, d } = getData( data )
  return <Bar options={ o } data={ d }/>;
}
