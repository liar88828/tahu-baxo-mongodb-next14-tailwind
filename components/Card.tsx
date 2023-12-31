import { HTMLAttributes, ReactNode } from 'react';
import { ProductOrderan } from '@/interface/model';
import { Rupiah } from '@/lib/utils/formatMoney';
import { ImageCards } from '@/components/PopUp';

export const UlCard = (
  { children, name = "" }:
    { children: ReactNode, name: string }
) => {
  return <ul
    data-test={ `list-${ name }` }
    className={ " md:flex md:flex-wrap md:gap-2  " }>{ children }</ul>
}
export const LiCard = (
  { children, name = "" }:
    { children: ReactNode, name: string }
) => {
  return <li
    data-test={ "list-" + name }
    className="static card card-side card-compact  bg-gray-100 shadow-xl mb-4 md:w-[48%]  ">
    { children }
  </li>
}

export const CardBody   = ( { children }: { children: ReactNode } ) => {
  return <div className="card-body flex flex-col lg:flex-row justify-between py-4 ">{ children }</div>
}
export const CardButton = ( { children }: { children: ReactNode } ) => {
  return ( <div className="card-actions justify-center items-stretch flex flex-row lg:flex-col  ">
    { children }
  </div> )
}

interface ChildComponentProps extends HTMLAttributes<HTMLParagraphElement> {
}

export const TextBody = ( { children }: { children: ReactNode } ) => {
  return <div className={ "flex flex-col lg:flex-row gap-0 sm:gap-2 w-full" }>{ children }</div>
}

export function TextTitle( props: { text: string } ) {
  return <h2 className="card-title text-sm sm:text-lg  md:text-lg font-bold"> { props.text }</h2>;
}

export const Texts = (
  {
    children, className
  }:
    {
      children: ReactNode,
      className?: string
    }
) => {
  return <p className={ `text-xs sm:text-sm md:text-md   ${ className }` }>{ children }</p>
}




type TextsProps = HTMLAttributes<HTMLParagraphElement> & {
  title: ReactNode;
  value: ReactNode;
  className1?:string,
  className2?:string
};
export const TextHidden = ( { title, value, className1 = "", className2 = "" }: TextsProps ) => {
  return <p className={ "text-xs sm:text-sm md:text-md text-black flex flex-nowrap" }>
    <span className={ `${ className1 } hidden xl:block mr-1 whitespace-nowrap` }>{ title }  </span>
    <span className={ `${ className2 }` }>{ value }</span>
  </p>
}
export const TextCard   = ( { text }: { text: string | number } ) => {
  return <span className={ "text-xs sm:text-base text-black mb-1 capitalize "  }>{ text }</span>

}

export const HeaderCard = ( { nama }: { nama: string | number } ) => {
  return <span className={ "text-sm sm:text-base font-bold text-black mb-1 capitalize"  }>{ nama }</span>

}



export const ImageCard  = ( { img, nama }: { img: string, nama: string } ) => {
  return <figure className={ " h-32 object-cover rounded " }>
    <img src={ img }
         alt={ nama }
         width={ 100 }
         height={ 100 }
         className=" rounded object-cover h-full w-32"
    />
  </figure>
}

export default function CardLists( { children, item, i, isItemAdded, }: {
  children: ReactNode,
  i: number,
  item: ProductOrderan,
  isItemAdded: ( item: ProductOrderan ) => boolean,
} ) {
  return ( <li
      key={ `${ item.id + i }` }
      className={ ` ${ isItemAdded( item )
                       ? " w-0 h-0  hidden "
                       : "" } flex flex-row items-center gap-2 p-1 sm:p-2 border border-gray-300 bg-white` }
      style={ {
        visibility: isItemAdded( item ) ? 'hidden' : 'visible',
      } }
    >
      {/*--------search--------*/ }
      <ImageCards img={ item.img } nama={ item.nama }/>
      <div className="ml-[2%] w-[60%]">
        <HeaderCard nama={ item.nama }/>
        <div className=" flex flex-row gap-2 justify-between ">
          <div className={ "flex flex-col" }>
            <TextCard text={ Rupiah( item.harga ) }/>
            <TextCard text={ item.jenis }/>
            <TextCard text={ item.lokasi }/>
          </div>
          <div className="">
            { children }
          </div>
        </div>
      </div>
    </li>
  );
}

