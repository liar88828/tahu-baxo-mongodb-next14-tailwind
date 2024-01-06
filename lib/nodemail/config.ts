import nodemailer from 'nodemailer'

export async function sendMail( {
  to,
  name,
  subject,
  body,
}: {
  to: string
  name: string
  subject: string
  body: string
} ) {
  const { SMTP_PASSWORD, SMTP_EMAIL } = process.env
  const transport                     = nodemailer.createTransport( {
    service: 'gmail',
    auth   : {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  } )

  try {
    const textResult = await transport.verify()
    console.log( textResult )
  }
  catch ( error ) {
    console.error( error )
    return
  }

  try {
    const sendResult = await transport.sendMail( {
      from: SMTP_EMAIL,
      to,
      subject,
      html: body,
    } )
    console.info( sendResult )
  }
  catch ( error ) {
    console.error( error )
  }
}

