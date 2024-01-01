import { usePathname } from 'next/navigation';
import Slidebar from '@/components/layouts/left/Slidebar';
import ProfileNav from '@/components/layouts/top/ProfileNav';


function Title() {
  let path = usePathname().split( "/" )[ 1 ].toUpperCase()
  // console.log(path)
  path     = path === 'TRAVEL' ? 'DELIVERY' : path
  return ( <a className="btn btn-ghost normal-case text-xl">{ path || "DASHBOARD" }</a> );
}


function Navbar() {
  return (
    <div className="navbar bg-base-100 fixed shadow-lg shadow-gray-200 ">
      <div className="navbar-start">
        <Slidebar/>
      </div>
      <div className="navbar-center">
        <Title/>
      </div>
      <div className="navbar-end">
        <ProfileNav/>
      </div>
    </div>
  );
}

export default Navbar;


