'use client';
import { PropsWithChildren, ReactNode } from 'react';
import { ImageCard, Texts } from '@/components/Card';
import { ProductOrderan } from '@/interface/model';
import { Rupiah } from '@/lib/utils/formatMoney';
import { Icon } from '@iconify/react';

export const FooterPopUp = ( { text }: {
  text: ReactNode
} ) => {
  return <>
    <div className="shadow shadow-slate-300 p-2 rounded ">
      <Texts>Keterangan</Texts>
      <br/>
      <Texts>{ text }</Texts>
    </div>
  </>
}
export const CardBody    = ( { title, text }: {
  title: ReactNode,
  text: ReactNode
} ) => {
  return <>
    <div className="card-body rounded p-1 sm:p-2 ">
      { title }
      { text }
    </div>
  </>
}

export const CardMaster = ( { children }: {
  children: ReactNode,
} ) => {
  return <ul className="  relative overflow-x-auto rounded-lg bg-white p-2 mt-1 gap-2 flex shadow shadow-slate-300">
    { children }
  </ul>
}

export const Card = ( { children }: {
  children: ReactNode,
} ) => {
  return <div className={ "card flex-nowrap flex" }>
    <div className="w-[10rem] rounded shadow shadow-gray-500 p-1 sm:p-2">
      { children }
    </div>
  </div>
}

export const CardPopUp = ( { semuaProduct }: {
  semuaProduct: ProductOrderan[]
} ) => {
  return <CardMaster>
    { semuaProduct.map( ( item: ProductOrderan, ) => {
      return (
        <Card key={ item.id + item.nama }>
          <ImageCard img={ item.img } nama={ item.nama }/>
          <CardBody
            title={
              <h1 className=" text-xs sm:text-lg font-bold mb-2">{ item.nama }</h1>
            }
            text={ <>
              <TextPopUp title={ "Harga" } value={ Rupiah( item.harga ) }/>
              <TextPopUp title={ "Jumlah" } value={ item.jumlah }/>
              <TextPopUp title={ "Jenis" } value={ item.jenis }/>
            </> }
          />
        </Card>
      )
    } ) }
  </CardMaster>
}

export const PopUpCard = ( { children }: {
  children: ReactNode
} ) => {
  return <div className=" border border-gray-200 rounded p-2 gap-4 flex flex-col w-full sm:w-[50%]">{ children }</div>
}
export const TextPopUp = ( { title, value, titik = false, style1 = "", style2 = "" }: {
  title: string,
  value: string | number,
  titik?: boolean,
  style1?: string,
  style2?: string
} ) => {

  return <div className={ "flex flex-nowrap gap-1" }>
    <p className={ `text-xs sm:text-sm md:text-md font-bold ${ style1 }` }>{ title } { titik && " : " }</p>
    <p className={ `text-xs sm:text-sm md:text-md ${ style2 }` }>{ value }</p>
  </div>
}

export const ImageCards = ( { img, nama }: {
  img: string,
  nama: string
} ) => {
  return <figure className={ " h-32 object-cover rounded " }>
    <img src={ img }
         alt={ nama }
         width={ 100 }
         height={ 100 }
         className=" rounded object-cover h-full w-32"
    />
  </figure>

}

export function PopUp( {
    children,
    name = '1',
    title = 'Create',
    styles = ''
  }: PropsWithChildren & {
    size?: boolean,
    color?: boolean,
    name?: string,
    title?: string | ReactNode,
    styles?: string
  }
) {

  return ( <>
      <label htmlFor={ `my_modal_${ name }` }
             data-test={ `popup-${ name }` }
             className={ `  btn sm:btn-sm md:btn-md text-white ${ styles } cursor-pointer` }>
        <div>
          { title }
        </div>
      </label>

      <input type="checkbox" id={ `my_modal_${ name }` } className="modal-toggle"/>

      <div
        data-test={ 'popup-modal' }
        className="modal  " role="dialog">
        <div className="modal-box w-11/12 max-w-5xl">
          <div className={ 'flex justify-between' }>
            <h1 className="text-lg font-bold py-2">{ title }</h1>
            <label
              data-test={ `popup-Close_${ name }` }
              htmlFor={ `my_modal_${ name }` }
              className={ 'btn btn-circle btn-outline' }>
              <Icon icon={ 'material-symbols:close' }/>
            </label>
          </div>
          { children }
        </div>
        <label className="modal-backdrop"
          // data-test={ 'popup-close' }
               htmlFor={ `my_modal_${ name }` }>Close</label>
      </div>
    </>
  );
}

export function PopUpAction( {
    children,
    name = '1',
    title = 'Create',
    styles = ''
  }: PropsWithChildren & {
    size?: boolean,
    color?: boolean,
    name?: string,
    title?: string | ReactNode,
    styles?: string
  }
) {
  return ( <>
      <label htmlFor={ `my_modal_${ name }` }
             data-test={ `popup-${ name }` }
             className={ `  btn sm:btn-sm md:btn-md   text-white   ${ styles } cursor-pointer` }>
        <div>
          { title }
        </div>
      </label>

      <input type="checkbox" id={ `my_modal_${ name }` } className="modal-toggle"/>

      <div
        data-test={ 'popup-modal' }
        className="modal  " role="dialog">
        <div className="modal-box w-11/12 max-w-5xl">
          <div className={ 'flex justify-between' }>
            <h1 className="text-lg font-bold py-2">{ title }</h1>
            <label
              data-test={ 'popup-Close' }
              htmlFor={ `my_modal_${ name }` }
              className={ 'btn btn-circle btn-outline' }>
              <Icon icon={ 'material-symbols:close' }/>
            </label>
          </div>
          <p className={ 'text-lg' }>
            Apakah anda yakin untuk menghapus data <span className={ 'font-bold' }> { name?.split( '_' ).pop() }</span>
          </p>
          <div className="modal-action">
            { children }
            <label htmlFor={ `my_modal_${ name }` }
                   data-test={ 'popup-Close-button' }
                   className="btn">Close!</label>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor={ `my_modal_${ name }` }>Close</label>
      </div>
    </>
  );
}


