'use client'
import React, { useState } from "react";
import { UserPublic } from "@/interface/user/UserPublic";
import { ProfileInfoItem } from "@/app/(sites)/checkout/ProfileInfoItem";

export function TitleCardProfile({ data }: { data: UserPublic[] }) {
  return (
    <div className="flex justify-between items-center w-full text-2xl mb-2 ">
      <h1 className={ 'font-bold text-xl' }>User Information</h1>
      <TitleCardProfileModal data={ data }/>
    </div>
  );
}

export function TitleCardProfileModal({ data }: { data: UserPublic[] }) {
  const [search, setSearch] = useState('')
  
  return (
    <>
      <button className="btn btn-primary btn-sm" onClick={ () => {
        // @ts-expect-error
        document.getElementById('my_modal_1').showModal()
      } }>Select
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Select User </h3>
          <input
            className="input input-sm w-full input-bordered"
            placeholder="Search Name user"
            type="text"
            value={ search }
            
            onChange={ (e) => setSearch(e.target.value) }
          />
          {/*<p className="py-4">Press ESC key or click the button below to close</p>*/ }
          <div className="overflow-y-scroll space-y-2 p-2">
            { data.map(item => <ProfileInfoItem item={ item } key={ item.id }/>) }
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */ }
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
