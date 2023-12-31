import { Icon } from '@iconify/react';

export default function Profile() {
  return (
    <div className="flex-none">
      <div className="dropdown dropdown-end">
        <label tabIndex={ 0 } className="btn btn-ghost btn-circle ">
          <div className="indicator">
            <Icon icon={ 'ic:round-shopping-cart' } width={ 18 } height={ 18 }/>
            <span className="badge badge-sm  badge-info indicator-item">8</span>
          </div>
        </label>
        <div tabIndex={ 0 } className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
          <div className="card-body">
            <span className="font-bold text-lg">8 Items</span>
            <span className="text-info">Subtotal: $999</span>
            <div className="card-actions">
              <button className="btn btn-primary btn-block">View cart</button>
            </div>
          </div>
        </div>
      </div>
      <div className="dropdown dropdown-end">
        <label tabIndex={ 0 } className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img src="https://picsum.photos/200/300"
                 alt={ "avatar" }/>
          </div>
        </label>
        <ul tabIndex={ 0 } className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li>
            <a className="justify-between">
              Profile
              <span className="badge">New</span>
            </a>
          </li>
          <li><a>Settings</a></li>
          <li><a>Logout</a></li>
        </ul>
      </div>
    </div>

  )
}