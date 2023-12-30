import { ReactNode } from 'react';
import { jpgTextNotFound } from '@/assets/default';

export function LayoutImagePrev( { children, text }: { children: ReactNode, text: string } ) {
  return <div
    data-type={ "image-prev-layout" }
    className={ " bg-white rounded-lg p-5 flex flex-col gap-5 shadows"  }>
    <div className={ 'flex flex-col gap-5 ' }>
      <label className={ "text-black mb-1  capitalize" }>Masukan Gambar { text }</label>
      { children }
    </div>
  </div>
}

export function ImagePrev( props: { src: string } ) {
  return <img
    data-test={ "img-prev" }
    src={ props.src }
    alt="Preview"
    className={ 'w-[100%] h-auto border-2 border-gray-300  rounded-3xl' }/>;
}

export function ImgCard( { img }: { img: string } ) {
  return <figure className={ 'w-[50%] sm:w-[35%] md:w-[50%]   lg:w-[40%] h-auto ' }>
    <img src={ img }
         alt={ img }
         width={ 200 }
         height={ 200 }
         className={ 'object-cover h-[100%] ' }
    />
    {/*<Image src={ config.url + img }*/ }
    {/*       alt={ img }*/ }
    {/*       width={ 100 }*/ }
    {/*       height={ 100 }*/ }
    {/*       quality={ 1 }*/ }
    {/*       className={ 'object-cover h-[100%] ' }*/ }
    {/*/>*/ }
  </figure>;
}


export const imageValid = ( img: string | undefined ): string => {
  if( !img ) {
    return jpgTextNotFound
  }
  else if( img.includes( "http" ) ) {
    return img
  }
  else {
    return jpgTextNotFound
  }
}
