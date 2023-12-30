'use client'
import { ToModel } from '@/interface/model';
import { useRouter } from 'next/navigation';
import { notifyData } from '@/lib/utils/toast';
import { url } from '@/lib/utils/url';

export function SubmitButton( props: { method: 'POST' | 'PUT' } ) {
  return <button
    data-test={ "button-submit" }
    type="submit"
    className="bg-blue-500 p-2 rounded-md text-white">
    { props.method === 'POST' ? 'Simpan' : 'EDIT' }
  </button>;
}

export function OpenButton( props:
  {
    method: 'POST' | 'PUT',
    fun: () => void,
    states: boolean
  } ) {
  return <button
    onClick={ props.fun }
    data-test={ "button-check" }
    type="button"
    className={ `btn ${ !props.states ? "btn-info" : "btn-error" } text-white uppercase` }>
    { !props.states ? "Tambah" : "Tutup" }
  </button>;
}

export function EditCard(
  { to, id, css = "btn-xs", name = "" }:
    { id: string, to: ToModel, css?: string, name: string }
) {
  const router = useRouter()
  return (
    <button
      data-test={ "edit-" + name }
      className={ ` btn sm:btn-sm btn-info text-white ${ css } ` }
      type={ "button" }
      onClick={ () => {
        // router.prefetch(`/${ to }/edit/` + id)
        // @ts-ignore
        router.push( `/${ to }/edit?id=${ id }` )
        // router.push( `/${ to }/edit/` + id )
      } }
    >Edit
    </button>

  )
}

export function DeleteCard( {
  id,
  to,
  css = "btn-xs",
  name = ""
}: { to: ToModel, id: string, css?: string, name: string } ) {
  const router = useRouter()
  // console.log( id )
  return (
    <button
      data-test={ "delete-" + name }
      className={ ` btn sm:btn-sm btn-error text-white ${ css } ` }
      type={ "button" }
      onClick={ async () => {
        if( confirm( "Apakah anda yakin untuk menghapus data ini ?" ) ) {
          // console.log( id )

          const res = await fetch( `${ url }/api/${ to }?id=${ id }`, {
              method: 'DELETE',
              body  : JSON.stringify( {} ),
            }
          )
          if( !res.ok ) {
            throw new Error( res.statusText )
          }
          else {
            // console.log( res )
            notifyData( 'Success Delete' )
            // router.prefetch('/')
            router.refresh()
          }
        }
        else {
          notifyData( "batal di ubah " )
        }
      } }
    >Delete
    </button>

  )
}