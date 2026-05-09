const express = require('express')
const cors = require('cors')
const app = express()

const authRoutes = require('./routes/authRoutes')
const reservationRoutes = require('./routes/reservationRoutes')

app.use(cors())
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/reservations', reservationRoutes)

module.exports = app

