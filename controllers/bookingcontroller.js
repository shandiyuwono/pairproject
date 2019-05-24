const {Booking, Room, RoomType, User} = require('../models/index') 
const dayCalculation = require('../helpers/daycalculation')
const priceCalculation = require('../helpers/pricecalculation')
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");

class BookingController {
    static login(req,res) {
        User.findOne({
            where: {
                username: req.body.username
            }
        })
         .then(user => {
             let valid = bcrypt.compareSync(req.body.password, user.password)
             if(valid){
                 req.session.user = {
                     id: user.id,
                     username: user.username,
                 }
                 
                 res.render('payment.ejs', {
                    RoomTypeId : req.params.id
                })
             }
             else{
                 res.render('login.ejs', {
                     booking: true,
                     error: 'password wrong'
                 })
             }
         })
         .catch(err => {
             res.send(err)
         })
    }


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
                let x = req.session
                if(ct <= at) {
                    res.render('stay.ejs', {
                        error: `Check-out date should be after check-in date`,
                        x
                    })
                }
                let availables = rooms
                    .filter(room => {
                        let available = true 
                        if (room.Bookings.find(booking => {
                            if (at >= new Date(booking.arrival_time) && at <= new Date(booking.checkout_time)) return true
                            if (ct >= new Date(booking.arrival_time) && ct <= new Date(booking.checkout_time)) return true
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

    static bookingSuccess(req,res) {
        let at = Booking.formatDate(req.session.arrival_time)
        let ct = Booking.formatDate(req.session.checkout_time)
        Room.findAll({
            where: {
                RoomTypeId: req.params.id
            }
        }) 
            .then(rooms =>{
                
                let roomIds = rooms.map(function(room) {
                    return room.id
                })

                return Promise.all(roomIds)
            })
            .then(roomIds => {
                var random = roomIds[Math.floor(Math.random()*roomIds.length)]
                Booking.create({
                    arrival_time: at,
                    checkout_time: ct,
                    RoomId: random,
                    UserId: req.session.user.id
                }) 
                    .then(() => {
                        res.render('success.ejs')
                    })
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
            .catch(err => {
                res.send(err)
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
            .catch(err => {
                res.send(err)
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
            .catch(err => {
                res.send(err)
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
        .catch(err => {
            res.send(err)
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
        .catch(err => {
            res.send(err)
        })

    }

    static doubleReserve(req,res) {
        RoomType.findByPk(2)
            .then(room => {
                res.render('bookdouble.ejs', {
                    reqsession : req.session,
                    roomData: room,
                    amount: null,
                    dayCalculation: dayCalculation,
                    priceCalculation: priceCalculation
                })
            })
            .catch(err => {
                res.send(err)
            })

    }

    static doubleBreakfast(req,res) {
        RoomType.findByPk(2)
           .then(room => {
               res.render('bookdouble.ejs', {
                   reqsession: req.session,
                   roomData: room,
                   amount: req.body.amount,
                   dayCalculation: dayCalculation,
                    priceCalculation: priceCalculation
               })
           })
           .catch(err => {
            res.send(err)
        })

   }

   static doubleBreakfastDelete(req,res) {
    RoomType.findByPk(2)
        .then(room => {
            res.render('bookdouble.ejs', {
                reqsession: req.session,
                roomData: room,
                amount: null,
                dayCalculation: dayCalculation,
                priceCalculation: priceCalculation
            })
        })
        .catch(err => {
            res.send(err)
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
            .catch(err => {
                res.send(err)
            })

        }

    static tripleReserve(req,res) {
        RoomType.findByPk(3)
            .then(room => {
                res.render('booktriple.ejs', {
                    reqsession : req.session,
                    roomData: room,
                    amount: null,
                    dayCalculation: dayCalculation,
                    priceCalculation: priceCalculation
                })
            })
            .catch(err => {
                res.send(err)
            })

    }

    static tripleBreakfast(req,res) {
        RoomType.findByPk(3)
        .then(room => {
            res.render('booktriple.ejs', {
                reqsession: req.session,
                roomData: room,
                amount: req.body.amount,
                dayCalculation: dayCalculation,
                priceCalculation: priceCalculation
            })
        })
        .catch(err => {
            res.send(err)
        })

}

    static tripleBreakfastDelete(req,res) {
        RoomType.findByPk(3)
            .then(room => {
                res.render('booktriple.ejs', {
                    reqsession: req.session,
                    roomData: room,
                    amount: null,
                    dayCalculation: dayCalculation,
                    priceCalculation: priceCalculation
                })
            })
            .catch(err => {
                res.send(err)
            })

        }   

    //quad

    static quad(req,res) {
        RoomType.findByPk(4)
        .then(room => {
            res.render('descriptionquad.ejs', {
                room: room
            })
        })
        .catch(err => {
            res.send(err)
        })

    }

    static quadReserve(req,res) {
        RoomType.findByPk(4)
            .then(room => {
                res.render('bookquad.ejs', {
                    reqsession : req.session,
                    roomData: room,
                    amount: null,
                    dayCalculation: dayCalculation,
                    priceCalculation: priceCalculation
                })
            })
            .catch(err => {
                res.send(err)
            })

    }

    static quadBreakfast(req,res) {
        RoomType.findByPk(4)
        .then(room => {
            res.render('bookquad.ejs', {
                reqsession: req.session,
                roomData: room,
                amount: req.body.amount,
                dayCalculation: dayCalculation,
                priceCalculation: priceCalculation
            })
        })
        .catch(err => {
            res.send(err)
        })

    }

    static quadBreakfastDelete(req,res) {
        RoomType.findByPk(4)
            .then(room => {
                res.render('bookquad.ejs', {
                    reqsession: req.session,
                    roomData: room,
                    amount: null,
                    dayCalculation: dayCalculation,
                    priceCalculation: priceCalculation
                })
            })
            .catch(err => {
                res.send(err)
            })

        }   
}

module.exports = BookingController