const router = require('express').Router()
const BookingController = require('../controllers/bookingcontroller')

const Sequelize = require('sequelize')
const Op = Sequelize.Op

router.post('/available', BookingController.checkAvailable)


router.get('/single', BookingController.single)


module.exports = router