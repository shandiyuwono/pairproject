const router = require('express').Router()
const BookingController = require('../controllers/bookingcontroller')

const Sequelize = require('sequelize')
const Op = Sequelize.Op

router.post('/available', BookingController.checkAvailable)



router.get('/single', BookingController.single)

router.get('/single/reserve', BookingController.singleReserve)

router.post('/single/reserve', BookingController.singleBreakfast)

router.get('/single/breakfast/delete', BookingController.singleBreakfastDelete)

router.get('/booking/single/reserve/:id', function(req,res) {
    console.log(req.params)
})

module.exports = router