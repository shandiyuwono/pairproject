const {Booking, Room, RoomType} = require('../models/index') 


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
    }

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
                    amount: null
                })
            })
    }

    static singleBreakfast(req,res) {

        // console.log(req.body.amount)
         RoomType.findByPk(1)
            .then(room => {
                res.render('booksingle.ejs', {
                    reqsession: req.session,
                    roomData: room,
                    amount: req.body.amount
                })
            })
        
    }

    static singleBreakfastDelete(req,res) {
        RoomType.findByPk(1)
        .then(room => {
            res.render('booksingle.ejs', {
                reqsession: req.session,
                roomData: room,
                amount: null
            })
        })
    }
}

module.exports = BookingController