"use client"
import Link from 'next/link';

export default function Basic( { pathname }: { pathname: string } ) {
  const path: string[] = pathname.split( "/" )
  return (
    <div className={ "flex flex-row gap-5 z-50 p-2 justify-between overflow-x-auto " }>

      {/*<div className="text-sm breadcrumbs">*/}
      {/*  <ul>*/}
      {/*    <li><a>{ path[ 1 ] }</a></li>*/}
      {/*    <li><Link*/}
      {/*      data-test={ "link-list" }*/}
      {/*        href={ `/${ path[ 1 ] }/list?page=1&take=10` }*/}
      {/*      >list*/}
      {/*      </Link>*/}
      {/*    </li>*/}

      {/*    <li><a>{ path[ 2 ].includes( 'list' ) ? '' : path[ 2 ] }</a>*/}
      {/*    </li>*/}
      {/*  </ul>*/}
      {/*</div>*/}

      {/*<Link*/}
      {/*  data-test={ "link-create" }*/}
      {/*  className={ `btn btn-primary float-right ${ path.includes( 'create' ) && '  btn-disabled' }` }*/}
      {/*  href={ `/${ path[ 1 ] }/create` }*/}
      {/*>Create*/}
      {/*</Link>*/}
    </div>
  )
}


