'use client'
import Navbar from '@/components/layouts/top/Navbar';
import { ToastContainer } from 'react-toastify';
import { ReactNode } from 'react';
import 'react-toastify/dist/ReactToastify.css';

export default function BasicLayout( { children }: { children: ReactNode } ) {
  // const path = usePathname()
  // const slug = path.split( "/" ).pop() ?? ""
  return ( <>
      <Navbar/>
      <div className="pt-20 p-5" data-test={ 'test-master' }>{ children }</div>
      <ToastContainer/>
    </>

  );
}

