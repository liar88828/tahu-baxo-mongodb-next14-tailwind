'use client'
import { enableCache, Icon } from '@iconify/react';
import { TStatus } from '@/interface/dashboard';
import { LinkNavbar } from '@/components/layouts/top/LinkNavbar';
import { listsMenu } from '@/assets/list';

export function ListDashboard(
  { data }: { data: TStatus[] } ) {
  console.log( data )

  const objectArray = data.map( d => {
    const count = d._count.status
    const nama  = d.status
    return { count, nama }
  } )

  enableCache( 'session' );

  console.log( objectArray )

  function getDiTerimaObject( status: string ) {
    return objectArray.find( obj => obj.nama.includes( status ) );
  }

  return (
    <div
      className=" flex flex-wrap  p-2 md:p-5 gap-2 justify-between bg-slate-50 rounded-2xl shadows">
      { listsMenu.map( d => (
        <LinkNavbar key={ d.title }
                    totalStatus={ getDiTerimaObject( d.title )?.count ?? 0 } title={ d.title }
                    href={ d.href }>
          <Icon icon={ d.icon } color={ "white" } name={ d.nameIcon } width={ 20 } height={ 20 }/>
        </LinkNavbar>
      ) ) }
    </div>
  );
}

