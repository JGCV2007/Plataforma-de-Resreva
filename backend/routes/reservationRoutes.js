const router = require('express').Router()

const authMiddleware = require('../middlewares/authMiddleware')

const reservationController = require('../controllers/reservationController')

router.post('/', authMiddleware, reservationController.create
)

router.get('/confirm/:token', reservationController.confirm
)

module.exports = router