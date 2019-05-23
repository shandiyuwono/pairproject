const express = require('express')
const app = express()
const port = 3000

const userRouter = require('./routers/userRouter')
const bookingRouter = require('./routers/bookingRouter')

app.use(express.urlencoded({ extended: false }))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.set('view-engine', 'ejs')

app.use((req,res,next) => {
    res.locals.error = null
    next()
})

app.use('/user', userRouter)
app.use('/booking', bookingRouter)

app.get('/', function(req,res) {
    res.render('home.ejs')
})
