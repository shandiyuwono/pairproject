module.exports = (req,res,next) => {
    console.log(req.body)
    if(req.body.first_name && req.body.last_name && req.body.email && req.body.phone && req.body.username && req.body.password) {
        next()
    }
    else{
        res.locals.error = 'Please fill in all fields to register'
        res.render('register.ejs')
    }
}