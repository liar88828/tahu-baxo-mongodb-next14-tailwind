
'use client'
import { usePathname } from 'next/navigation';
import Complex from '@/components/layouts/top/Complex';
import Basic from '@/components/layouts/top/Basic';
import Navbar from '@/components/layouts/top/Navbar';
import { ToastContainer } from 'react-toastify';
import { ReactNode } from 'react';
import 'react-toastify/dist/ReactToastify.css';
export default function BasicLayout( { children }: { children: ReactNode } ) {
  const path = usePathname()
  const slug = path.split( "/" ).pop() ?? ""
  return ( <>
      <Navbar/>
      <div className="pt-20 p-5"
           data-test={ 'test-master' }
      >
        { path.includes( "table" ) || path.includes( "orderan" )
          ? <Complex slug={ slug }/>
          : path.includes( 'list' ) || path.includes( 'create' )
            ? <Basic pathname={ path }/> : null }
        { children }
      </div>
      <ToastContainer/>
    </>

  );
}

