function toStrings( phone: string | number ) {
  if( typeof phone === 'number' ) {
    return phone.toString()
  }
  return phone
}

export function formatPhone( phoneNumber: string | number | undefined ): string {

  if( phoneNumber !== undefined ) {

    phoneNumber              = toStrings( phoneNumber )
    phoneNumber              = phoneNumber.startsWith( "0" ) ? phoneNumber : "0" + phoneNumber
    const numericPhoneNumber = phoneNumber.replace( /\D/g, '' );

    if( numericPhoneNumber.startsWith( '0' ) ) {
      return `+62 ${ numericPhoneNumber.slice( 1, 5 ) } ${ numericPhoneNumber.slice( 5, 9 ) } ${ numericPhoneNumber.slice( 9 ) }`;
    }

  }
  return "-kosong-"

}
