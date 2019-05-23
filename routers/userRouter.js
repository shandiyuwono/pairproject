const router = require('express').Router()
const UserController = require('../controllers/usercontroller')
const registerAuthentication = require('../middlewares/registerauthentication')

router.get('/register', function(req,res) {
    res.render('register.ejs')
})


router.post('/register', registerAuthentication, UserController.register)

router.get('/login', function(req,res) {
    res.render('login.ejs')
})

router.post('/login', UserController.login)


module.exports = router