import Image from 'next/image';
import profilePic from '@/public/logo.png';
import React, { memo } from 'react';
import { routesNav } from '@/assets/list';
import { Icon } from '@iconify/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export type TRoutesNav = {
  titleParent: string,
  icon: string,
  links: {
    name: string,
    path: string,
  }[]
}
const LinkSlidebar = memo( function ListSlidebar(
  { paths, title, }:
    { paths: string, title: string, } ) {

  const pathname = usePathname()
  const path     = pathname.split( "/" )[ 1 ]

  return ( <Link href={ paths } replace={ true }
                 className={ `flex rounded items-center px-2 py-2 mb-2
                  ${ path.includes( title.toLowerCase() )
                     ? " bg-info hover:bg-blue-500 "
                     : " bg-success hover:bg-green-500 " } 
                  ` }
    >
      <span className={ `ml-2 text-white font-bold  ` }>{ title }</span>
    </Link>
  )
} )

export function ListAccordion( { titleParent, links, icon }: TRoutesNav ) {
  return <div className="collapse bg-neutral">
    <input type="radio" name="my-accordion-1"/>

    <div className="collapse-title text-xl font-medium flex items-center gap-5">
      <Icon icon={ icon } color={ 'black' } name={ titleParent }
            width={ 20 }
            height={ 20 }
      />
      <span>{ titleParent }</span>
    </div>
    <div className="collapse-content ">
      { links.map( d => (
        <LinkSlidebar paths={ d.path } title={ d.name } key={ d.name }/>
      ) ) }

    </div>
  </div>

}

const Slidebar = () => {
  const ListSlide = <div className={ ` px-2 flex gap-2 flex-col` }>
    { routesNav.map( d => (
      <ListAccordion
        titleParent={ d.titleParent }
        icon={ d.icon }
        links={ d.links }
        key={ d.titleParent }/>
    ) ) }
  </div>

  return (
    <div className="drawer  left-5">
      <input id="my-drawer" type="checkbox" className="drawer-toggle"/>
      <div className="drawer-content ">
        <label htmlFor="my-drawer" className="btn btn-success drawer-button text-white mt-1">
          <svg className="w-5 h-5" aria-hidden="true"
               xmlns="http://www.w3.org/2000/svg" fill="none"
               viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round"
                  strokeLinejoin="round" strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"/>
          </svg>

        </label>
      </div>

      <div className="drawer-side ">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay "></label>
        <div className="menu p-4 w-64 min-h-full bg-base-300/20 text-base-content ">

          <div className={ "flex items-center flex-col" }>
            <Image
              src={ profilePic }
              priority
              className={ "mt-20" }
              alt="/logo.png"/>
            <h1 className={ "card-title text-center my-2 text-white" }>Menu</h1>
          </div>

          { ListSlide }
          <div className="drawer-content right-5 absolute">
            <label htmlFor="my-drawer" className="btn btn-success drawer-button text-white ">
              <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                   viewBox="0 0 512 512">
                <polygon
                  points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"/>
              </svg>
            </label>
          </div>
        </div>
      </div>
    </div> )
}

export default Slidebar
