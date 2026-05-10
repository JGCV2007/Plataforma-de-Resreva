const { z } = require('zod')

const reservationSchema = z.object({
  date: z
    .string()
    .datetime('Data inválida')
})

module.exports = {
  reservationSchema
}