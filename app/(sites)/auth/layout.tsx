import React, { ReactNode } from 'react';
import { IconMenu } from "@/components/icon/IconMore";
import Link from "next/link";

function Page({children} : { children : ReactNode }) {
  return (<>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link
            href={'/home'}
            className="btn btn-ghost text-xl"
          >
            My Store
          </Link>
        </div>
        <div className="flex-0">

          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <IconMenu />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li><a>Homepage</a></li>
              <li><a>Portfolio</a></li>
              <li><a>About</a></li>
            </ul>
          </div>
        </div>
      </div>
      { children }
    </>
  )
}

export default Page;
