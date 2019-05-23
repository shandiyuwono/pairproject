const router = require('express').Router()
const AdminController = require('../controllers/adminController')

router.get('/', AdminController.showBookings)

router.get('/delete/:id', AdminController.delete)

router.get('/edit/:id', AdminController.edit)

router.post('/edit/:id', AdminController.update)


module.exports = router