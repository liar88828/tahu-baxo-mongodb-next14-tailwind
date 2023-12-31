"use client"

import { useRouter } from 'next/navigation';
import { notifyData } from '@/lib/utils/toast';

export const DeleteTable = ( { ids }: {
  ids: string[],
} ) => {
  const router = useRouter()

  async function deleteTable( id: string[] ) {
    if( confirm( `Apakah anda yakin untuk Menghapus data ini ?` ) ) {

      const res = await fetch( `http://localhost:3000/api/table`, {
        method: 'DELETE',
        body: JSON.stringify( ids ),
        headers: { 'Content-Type': "application/json" }
      } )

      // console.log( res )
      if( !res.ok ) {
        throw new Error( 'fail delete data' )
      }
      const data = await res.json()

      // console.log(data)
      if( data.success ) {
        notifyData( 'success delete data' )
        // revalidatePath('/','page')
        router.refresh()

      }
      else notifyData( 'fail delete data' )
      // }
    }
  }

  return ( <button
      data-test={ 'button-delete' }
      className=" btn btn-sm sm:btn-md text-white btn-error "
      onClick={ () => deleteTable( ids ) }>
      DELETE
    </button>
  )
}
