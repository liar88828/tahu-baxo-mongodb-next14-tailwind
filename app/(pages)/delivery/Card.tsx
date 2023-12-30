import { TDelivery, ToModel, TProduct } from '@/interface/model';
import { CardBody, CardButton, LiCard, TextBody, TextHidden, Texts, TextTitle } from '@/components/Card';
import { imageValid, ImgCard } from '@/components/Images';
import { DeleteCard, EditCard } from '@/components/elements/Buttons';
import { Rupiah } from '@/lib/utils/formatMoney';

export function ListTravel(
  { d, to }:
    { d: TDelivery, to: ToModel }
) {
  // console.log(d.img)
  return ( <LiCard name={ d.nama }>
      <ImgCard img={ imageValid( d.img ) }/>
      <CardBody>
        <div>
          <TextTitle text={ d.nama }/>
          <TextBody>
            <div>
              <Texts><span className={ 'badge badge-primary' }> { d.hp }</span></Texts>
              <Texts>{ d.lokasi }</Texts>
              <Texts>Biaya { Rupiah( d.harga ) }</Texts>
              <TextHidden title={ "Jenis : " } value={ d.jenis }/>

            </div>
            <div>
              <TextHidden title={ "Keterangan : " } value={ d.keterangan }/>
            </div>
          </TextBody>
        </div>

        <CardButton>
          <EditCard to={ to } id={ d.id } name={ d.nama }/>
          <DeleteCard id={ d.id } to={ to } name={ d.nama }/>
        </CardButton>

      </CardBody>
    </LiCard>

  )
}