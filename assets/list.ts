
// @ts-ignore
import { statusWarna } from '@/app/style/status';
import { IconProps } from '@iconify/react';

export const listComplex = [
  {
    title    : "Create",
    href     : "/orderan/create",
    className: " bg-primary text-white shadow "
  },
  {
    title    : "Semua",
    href     : "/table/Semua",
    className: " bg-secondary text-white shadow "
  },
  {
    title    : "Terima",
    href     : "/table/Terima",
    className: statusWarna( "Terima" )
  },
  {
    title    : "Proses",
    href     : "/table/Proses",
    className: statusWarna( "Proses" )
  },
  {
    title    : "Kirim",
    href     : "/table/Kirim",
    className: statusWarna( "Kirim" )
  },
  {
    title    : "Selesai",
    href     : "/table/Selesai",
    className: statusWarna( "Selesai" )
  },
]

export type TRoutesNav = {
  titleParent: string,
  icon: IconProps['icon'],
  links: {
    name: string,
    path: string,
  }[]
}

export const routesNav: TRoutesNav[] = [
  {
    titleParent: "Dashboard",
    icon       : "fluent:data-pie-24-filled",

    links: [
      {
        name: "Dashboard",
        path: "/",
      },
    ],
  },
  {
    titleParent: "Transaction",
    icon       : "mdi:trolley",

    links: [
      {
        name: "Orderan",
        path: "/orderan/create",
      }, {
        name: "Table",
        path: "/table/Semua",
        // icon : "ph:table".
      },
    ],
  },
  {
    titleParent: "Product",
    icon       : "icon-park-outline:ad-product",
    links      : [
      {
        name: "List",
        path: "/product/list?page=1&take=10",
      },
      // {
      //   name: "Create",
      //   path: "/product/create",
      // },
    ],
  },
  {
    titleParent: "Delivery",
    icon       : "carbon:delivery",
    links      : [
      {
        name: "List",
        path: "/delivery/list?page=1&take=10",
      },
      // {
      //   name: "Create",
      //   path: "/delivery/create",
      // },
    ],
  },

  {
    titleParent: "Bank",
    icon       : "tdesign:money",
    links      : [
      {
        name: "List",
        path: "/bank/list?page=1&take=10",
      },
      // {
      //   name: "Create",
      //   path: "/bank/create",
      // },
    ],
  }
]


export const listsMenu = [
  {
    title: "Terima",
    href : "?id=Terima",
    icon    : "ic:outline-book",
    nameIcon: "Book",
  },
  {
    title: "Proses",
    href : "?id=Proses",
    icon    : "mdi:trolley",
    nameIcon: "Transaction",
  }
  ,
  {
    title: "Kirim",
    href : "?id=Kirim",
    icon    : "carbon:delivery",
    nameIcon: "Delivery",
  },

  {
    title   : "Selesai",
    href    : "?id=Selesai",
    icon    : "icon-park-solid:success",
    nameIcon: "Success",
  }
]