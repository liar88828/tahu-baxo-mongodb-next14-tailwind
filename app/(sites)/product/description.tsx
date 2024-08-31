import { repeat } from "@/lib/utils/repeat";
import React from "react";

export function Description(props : any) {
  return (
    <div className='p-2 space-y-4'>
      <h1 className={'text-xl font-medium  line-clamp-2 text-ellipsis'}>Lorem ipsum dolor sit amet, rerum. Lorem ipsum
        dolor sit amet, consectetur adipisicing elit. Nemo!</h1>
      <div className="flex">

        <h2 className={'font-bold text-2xl text-primary'}>Rp4000.00</h2>
        <p className={'font-light line-through'}>Rp1234.34</p>
      </div>
      <div className="">
        <div className="space-x-1">
          <span className={'font-bold text-lg '}>Size :</span>
          <span className={'font-light text-lg'}>XL</span>
        </div>
        <div className="overflow-x-auto flex space-x-2 mt-1">
          {repeat()
            .map((_, i) => (
              <button key={i} className={'btn btn-outline font-bold text-xl'}>S</button>)
            )}
        </div>
      </div>
      <div className="">
        <h1 className={'font-bold '}>Description</h1>
        <p className={'text-justify'}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores aut culpa
          dolorem dolorum error esse
          exercitationem fuga fugit laudantium maiores modi molestiae provident quae quo repellendus reprehenderit
          repudiandae, sint voluptatum?</p>
      </div>
    </div>
  );
}
