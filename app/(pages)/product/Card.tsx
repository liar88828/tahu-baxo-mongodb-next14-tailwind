import { ToModel, TProduct } from '@/interface/model';
import { CardBody, CardButton, LiCard, TextBody, TextHidden, Texts, TextTitle } from '@/components/Card';
import { ImgCard } from '@/components/Images';
import { DeleteCard, EditCard } from '@/components/elements/Buttons';
import { Rupiah } from '@/lib/utils/formatMoney';
import { PopUp } from '@/components/PopUp';
import FormBank from '@/app/(pages)/bank/Form';
import FormProduct from '@/app/(pages)/product/Form';

export const to = "product"

export default function ListProduct(
  { d, to }:
    { d: TProduct, to: ToModel } ) {
  return (
    <LiCard name={ d.nama }>
      <ImgCard img={ d.img }/>
      <CardBody>
        <div>
          <TextTitle text={ d.nama }/>
          <TextBody>
            <div>
              <Texts><span className={ 'badge badge-primary' }>{ Rupiah( d.harga ) }</span></Texts>
              <TextHidden title={ "Jenis : " } value={ d.jenis }/>
              <Texts>{ d.lokasi }</Texts>
            </div>
            <div>
              <TextHidden title={ "Keterangan : " } value={ d.keterangan }/>
            </div>
          </TextBody>
        </div>

        <CardButton>
          {/*<EditCard to={ to } id={ d.id } name={ d.nama }/>*/}
          <PopUp name={`update_product_${d.id}`} title={'Edit'} styles={'btn-primary'}>
            <FormProduct
              method={ 'PUT' }
              defaultData={ d }
              to={ 'product' }/>
          </PopUp>
          <DeleteCard to={ to } id={ d.id } name={ d.nama }/>
        </CardButton>

      </CardBody>
    </LiCard>

  )
}

