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
            let valid = bcrypt.compareSync(req.body.password, user.password)
            if(valid){
                req.session.user = {
                    id: user.id,
                    username: user.username,
                }
                console.log(req.session);
                
                res.redirect('/')
            }
            else{
                res.render('login.ejs', {
                    error: 'password wrong'
                })
            }
        })
        .catch(err => {
            res.send(err)
        })
    }

    static logout(req, res) {
        if (req.session.user) {
            req.session.user.destroy(function(err) {
              if(err) {
                return next(err);
              } else {
                return res.redirect('/');
              }
            });
          }
    }

}

module.exports = UserController