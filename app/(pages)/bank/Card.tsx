import { TBank } from '@/interface/model';
import { CardBody, CardButton, LiCard, TextBody, TextHidden, Texts, TextTitle } from '@/components/Card';
import { ImgCard } from '@/components/Images';
import { DeleteCard, EditCard } from '@/components/elements/Buttons';
import { formatPhone } from '@/lib/utils/formatPhone';

export const to = "bank"

export function ListBank( { d }: { d: TBank } ) {
  return ( <LiCard name={ d.nama }>
      <ImgCard img={ d.img }/>
      <CardBody>
        <div>
          <TextTitle text={ d.nama }/>
          <TextBody>
            <div>
              <Texts className={ " " }>{ formatPhone( d.hp ) }</Texts>
              <TextHidden title={ "Jenis : " } value={ d.jenis } className2={ "badge badge-info" }/>
              <Texts>{ d.lokasi }</Texts>
            </div>

            <div>
              <TextHidden title={ "Keterangan : " } value={ d.keterangan }/>
            </div>
          </TextBody>
        </div>

        <CardButton>
          <EditCard to={ to } id={ d.id } name={ d.nama }/>
          <DeleteCard to={ to } id={ d.id } name={ d.nama }/>
        </CardButton>

      </CardBody>
    </LiCard>

  )
}

