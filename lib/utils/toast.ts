import { toast } from 'react-toastify';

export function errorToast( text: string ) {
  toast.error( text, {
    position       : "top-right",
    autoClose      : 3000,
    hideProgressBar: false,
    closeOnClick   : true,
    pauseOnHover   : true,
    theme          : "dark",
  } );
}

function successToast( text: string ) {
  toast.success( text, {
    position       : "top-right",
    autoClose      : 3000,
    hideProgressBar: false,
    closeOnClick   : true,
    pauseOnHover   : true,
    theme          : "light",
  } )
}

export const notifyData = ( msg?: string, ) => {

  if( msg?.includes( "ccess" ) ) {
    successToast( msg )
  }

  if( msg?.includes( "rror" ) || msg?.includes( 'ail' ) ) {
    errorToast( msg )
  }

}