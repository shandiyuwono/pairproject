const {User} = require('../models/index')
const bcrypt = require('bcrypt');

class UserController {
    static register(req,res){
        User.create(req.body)
            .then(() => {
                res.redirect('/')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static login(req,res) {
       User.findOne({
           where: {
               username: req.body.username
           }
       })
        .then(user => {
            if(!user) {
                res.render('login.ejs', {
                    error: 'username does not exist'
                })
            }
            else {
                let valid = bcrypt.compareSync(req.body.password, user.password)
                if(valid){
                    req.session.user = {
                        id: user.id,
                        username: user.username,
                    }
                    console.log(req.session);
                    
                    res.redirect('/stay')
                }
                else{
                    res.render('login.ejs', {
                        error: 'password wrong'
                    })
                }
            }
        })
        .catch(err => {
            res.send(err)
        })
    }

    static logout(req, res) {
        req.session.destroy()
        res.redirect('/')
    }

}

module.exports = UserController