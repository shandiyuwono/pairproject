const router = require('express').Router()
const BookingController = require('../controllers/bookingcontroller')

const Sequelize = require('sequelize')
const Op = Sequelize.Op

router.post('/available', BookingController.checkAvailable)

router.get('/single', BookingController.single)

router.get('/single/reserve', BookingController.singleReserve)

router.post('/single/reserve', BookingController.singleBreakfast)

router.get('/single/breakfast/delete', BookingController.singleBreakfastDelete)

router.post('/:id/payment', (req,res,next) => {
    if(req.session.user) {
        next()
    }
    else{
        // res.redirect('/user/login')
        res.render('login.ejs', {
            booking: true,
            id : req.params.id
        })
    }
}, (req,res) => {
    res.render('payment.ejs', {
        RoomTypeId : req.params.id
    })
})  

router.post('/:id/payment/login', BookingController.login)  


//double
router.get('/double', BookingController.double)

router.get('/double/reserve', BookingController.doubleReserve)

router.post('/double/reserve', BookingController.doubleBreakfast)

router.get('/double/breakfast/delete', BookingController.doubleBreakfastDelete)

//triple

router.get('/triple', BookingController.triple)

router.get('/triple/reserve', BookingController.tripleReserve)

router.post('/triple/reserve', BookingController.tripleBreakfast)

router.get('/triple/breakfast/delete', BookingController.tripleBreakfastDelete)

//quad

router.get('/quad', BookingController.quad)

router.get('/quad/reserve', BookingController.quadReserve)

router.post('/quad/reserve', BookingController.quadBreakfast)

router.get('/quad/breakfast/delete', BookingController.quadBreakfastDelete)

//payment

router.post('/:id/success', BookingController.bookingSuccess)


module.exports = router