const express = require('express')
const cors = require('cors')

const authRoutes = require('./routes/authRoutes')
const reservationRoutes = require('./routes/reservationRoutes')

const app = express()

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://plataforma-de-resreva.vercel.app"
  ]
}))

app.use(express.json())

app.use('/auth', authRoutes)
app.use('/reservations', reservationRoutes)

module.exports = app