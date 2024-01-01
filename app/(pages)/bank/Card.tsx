import { TBank } from '@/interface/model';
import { CardBody, CardButton, LiCard, TextBody, TextHidden, Texts, TextTitle } from '@/components/Card';
import { ImgCard } from '@/components/Images';
import { DeleteCard } from '@/components/elements/Buttons';
import { formatPhone } from '@/lib/utils/formatPhone';
import { PopUp, PopUpAction } from '@/components/PopUp';
import FormBank from '@/app/(pages)/bank/Form';

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
          <PopUp name={ `update_bank_${ d.nama }` }
                 title={ 'Edit' } styles={ 'btn-primary' }>
            <FormBank
              method={ 'PUT' }
              defaultData={ d }
              to={ 'bank' }/>
          </PopUp>
          {/*<EditCard to={ to } id={ d.id } name={ d.nama }/>*/ }


          <PopUpAction title={ 'Delete' } name={ `delete_bank_${ d.nama }` } styles={'btn-error'}>
            <DeleteCard to={ to } id={ d.id } name={ d.nama }/>
          </PopUpAction>
        </CardButton>

      </CardBody>
    </LiCard>

  )
}

