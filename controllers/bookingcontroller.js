const {Booking, Room, RoomType} = require('../models/index') 
const dayCalculation = require('../helpers/daycalculation')
const priceCalculation = require('../helpers/pricecalculation')

class BookingController {
    
    static checkAvailable(req,res){
        let at = new Date(req.body.arrival_time)
        let ct = new Date(req.body.checkout_time)
        req.session.arrival_time = at
        req.session.checkout_time = ct
        req.session.guests = Number(req.body.guests) 
 
        let availableRooms;
        Room.findAll({
            include: Booking,
            order: [['id']]
        })
            .then(rooms => {
                // res.send(rooms)
                if(at - new Date() < 0) {
                    throw `Date input must be today or after ${new Date().toISOString().slice(0, 10)}`
                }
                if(ct < at) {
                    throw `Check-out date should be after check-in date`
                }
                let availables = rooms
                    .filter(room => {
                        let available = true 
                        if (room.Bookings.find(booking => {
                            if (at > new Date(booking.arrival_time) && at < new Date(booking.checkout_time)) return true
                            if (ct > new Date(booking.arrival_time) && ct < new Date(booking.checkout_time)) return true
                            if (at < new Date(booking.arrival_time) && ct > new Date(booking.checkout_time)) return true
                        }
                        )) {
                            available = false
                        }
                        return available
                    })
                
                availableRooms = availables
                let roomtypes = availables.map(function(room) {
                    return room.getRoomType()
                })
    
                return Promise.all(roomtypes)
            })
            .then(roomtypes => {
                // res.send(req.body)

                 res.render('available.ejs', {
                    availableRooms: availableRooms,
                    roomTypes: roomtypes,
                    guests: req.body.guests
                })
                // res.send(availableRooms)
            })
            .catch(err => {
                res.send(err)
            })
    }

    //single
    static single(req,res){
        RoomType.findByPk(1)
            .then(room => {
                res.render('descriptionsingle.ejs', {
                    room: room
                })
            })
    }

    static singleReserve(req,res) {
        RoomType.findByPk(1)
            .then(room => {
                res.render('booksingle.ejs', {
                    reqsession : req.session,
                    roomData: room,
                    amount: null,
                    dayCalculation: dayCalculation,
                    priceCalculation: priceCalculation
                })
            })
    }

    static singleBreakfast(req,res) {
         RoomType.findByPk(1)
            .then(room => {
                res.render('booksingle.ejs', {
                    reqsession: req.session,
                    roomData: room,
                    amount: req.body.amount,
                    dayCalculation: dayCalculation,
                    priceCalculation: priceCalculation
                })
            })
        
    }

    static singleBreakfastDelete(req,res) {
        RoomType.findByPk(1)
        .then(room => {
            res.render('booksingle.ejs', {
                reqsession: req.session,
                roomData: room,
                amount: null,
                dayCalculation: dayCalculation,
                priceCalculation: priceCalculation
            })
        })
    }
    
    //double
    static double(req,res) {
        RoomType.findByPk(2)
        .then(room => {
            res.render('descriptiondouble.ejs', {
                room: room
            })
        })
    }

    static doubleReserve(req,res) {
        RoomType.findByPk(2)
            .then(room => {
                res.render('bookdouble.ejs', {
                    reqsession : req.session,
                    roomData: room,
                    amount: null
                })
            })
    }

    static doubleBreakfast(req,res) {
        RoomType.findByPk(2)
           .then(room => {
               res.render('bookdouble.ejs', {
                   reqsession: req.session,
                   roomData: room,
                   amount: req.body.amount
               })
           })
   }

   static doubleBreakfastDelete(req,res) {
    RoomType.findByPk(2)
        .then(room => {
            res.render('bookdouble.ejs', {
                reqsession: req.session,
                roomData: room,
                amount: null
            })
        })
    }   

    //triple
    static triple(req,res) {
            RoomType.findByPk(3)
            .then(room => {
                res.render('descriptiontriple.ejs', {
                    room: room
                })
            })
        }

    static tripleReserve(req,res) {
        RoomType.findByPk(3)
            .then(room => {
                res.render('booktriple.ejs', {
                    reqsession : req.session,
                    roomData: room,
                    amount: null
                })
            })
    }

    static tripleBreakfast(req,res) {
        RoomType.findByPk(3)
        .then(room => {
            res.render('booktriple.ejs', {
                reqsession: req.session,
                roomData: room,
                amount: req.body.amount
            })
        })
}

    static tripleBreakfastDelete(req,res) {
        RoomType.findByPk(3)
            .then(room => {
                res.render('booktriple.ejs', {
                    reqsession: req.session,
                    roomData: room,
                    amount: null
                })
            })
        }   

    //quad

    static quad(req,res) {
        RoomType.findByPk(3)
        .then(room => {
            res.render('descriptionquad.ejs', {
                room: room
            })
        })
    }

    static quadReserve(req,res) {
        RoomType.findByPk(3)
            .then(room => {
                res.render('bookquad.ejs', {
                    reqsession : req.session,
                    roomData: room,
                    amount: null
                })
            })
    }

    static quadBreakfast(req,res) {
        RoomType.findByPk(3)
        .then(room => {
            res.render('bookquad.ejs', {
                reqsession: req.session,
                roomData: room,
                amount: req.body.amount
            })
        })
    }

    static quadBreakfastDelete(req,res) {
        RoomType.findByPk(3)
            .then(room => {
                res.render('bookquad.ejs', {
                    reqsession: req.session,
                    roomData: room,
                    amount: null
                })
            })
        }   
}

module.exports = BookingController