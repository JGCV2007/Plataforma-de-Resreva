const prisma = require('../config/prisma')
const crypto = require('crypto')
const { reservationSchema } = require('../validations/reservationValidation')

exports.create = async (req, res) => {

  try {

    const validation = reservationSchema.safeParse(req.body)

    if (!validation.success) {
      return res.status(400).json({
        errors: validation.error.issues
      })
    }

    const { date } = req.body

    const existingReservation =
      await prisma.reservation.findFirst({
        where: {
          date: new Date(date)
        }
      })

    if (existingReservation) {
      return res.status(400).json({
        error: 'Horario indisponivel'
      })
    }

    const token = crypto.randomUUID()

    const reservation =
      await prisma.reservation.create({
        data: {
          date: new Date(date),
          token,
          userId: req.userId
        }
      })

    return res.status(201).json(reservation)

  } catch (error) {
    return res.status(500).json(error)
  }
}

exports.confirm = async (req, res) => {

  try {

    const { token } = req.params

    const reservation =
      await prisma.reservation.findUnique({
        where: { token }
      })

    if (!reservation) {
      return res.status(404).json({
        error: 'Reserva nao encontrada'
      })
    }

    await prisma.reservation.update({
      where: { token },
      data: {
        status: 'CONFIRMED'
      }
    })

    return res.json({
      message: 'Reserva confirmada'
    })

  } catch (error) {
    return res.status(500).json(error)
  }
}