const express = require('express')
const session = require('express-session')
const app = express()
const port = process.env.PORT || 4000

const userRouter = require('./routers/userRouter')
const bookingRouter = require('./routers/bookingRouter')
const adminRouter = require('./routers/adminRouter')


const {Room, Booking, RoomType} = require('./models/index')

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie:{maxAge: 600000000}
}))

app.use(express.urlencoded({ extended: false }))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
const path = require('path')
app.use(express.static(path.join(__dirname, './public')))
app.set('view-engine', 'ejs')

app.use((req,res,next) => {
    res.locals.error = null
    res.locals.booking = false
    next()
})

app.use('/user', userRouter)
app.use('/booking', bookingRouter)
app.use('/admin', adminRouter)
app.get('/', function(req,res) {
    let x = req.session
    res.render('home.ejs', {x})
})

app.get('/stay', function(req,res) {
    let x = req.session
    res.render('stay.ejs', {x})
})

