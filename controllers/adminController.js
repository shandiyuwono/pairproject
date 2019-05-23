const {Booking, RoomType, Room} = require('../models/index')

class AdminController {
    static showBookings(req,res) {
        Room.findAll({
            include: [Booking, RoomType],
            order: [['id']]
            })
                .then(rooms => {
                    // res.send(rooms)
                    res.render('admin.ejs', {
                        roomsData: rooms
                    })
                })
                .catch(err => {
                    // reject(err)
                    res.send(err)
                })
    }

    static delete(req,res) {
        Room.findOne(
            {
                where: req.params
            }
        )
            .then(room => {
                room.destroy()
                res.redirect('/admin')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static edit(req,res) {
        Room.findOne(
            {
                include: [Booking, RoomType],
                where : req.params
            } )
            .then(room => {
                // res.send(room)
                res.render('adminedit.ejs', {
                    room: room
                })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static update(req,res) {

        Room.findOne({
            include: [Booking, RoomType],
            where: req.params
        })
            .then(room => {
                RoomType.update({
                    price: req.body.price,
                    size: req.body.size
                }, { where : {
                    id: room.RoomType.id
                }})

                res.redirect('/admin')
            })
            .catch(err => {
                res.send(err)
            })
    }


}

module.exports = AdminController