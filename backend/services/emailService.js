const { Resend } = require('resend')

const resend = new Resend(process.env.RESEND_API_KEY)

async function sendConfirmationEmail(
  email,
  token
) {

  await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Confirmacao de reserva',
    html: `
      <h1>Confirmar Presença</h1>

      <a href="http://localhost:3000/reservations/confirm/${token}">
        Confirmar Reserva
      </a>
    `
  })
}

module.exports = {
  sendConfirmationEmail
}