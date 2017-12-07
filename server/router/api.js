const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

// json & passport auth

const jwt = require('jsonwebtoken');
const passport = require('passport');

// Set up middleware
const requireAuth = passport.authenticate('jwt', { session: false });
  // Initialize passport for use
  router.use(passport.initialize());

  // Bring in defined Passport Strategy
  require('../middleware/passportAuth')(passport);

// var jwt = require("jwt-simple");
// var passport = require('passport');
var cfg = require ('../config/config')

let User = require('../models/user.model');

// var auth = require("../middleware/passportAuth")(); 


var db ='mongodb://localhost:27017/profile'
mongoose.connect(db,{
    useMongoClient: true,
    /* other options */
  });

// router.use(auth.initialize())

  router.post('/signup', function(req, res){
    var email=req.body.email;
    var password = req.body.password;
    User.findOne({'email':email},(err,user)=>{
        if (err){
            return res.json({error: true});
        }
        if (user){
             res.json({'message':'User already!'});
            
        }
        var newUser= new User;
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.save(function(err,result){
            if(err){
                return res.json({error: true}); 
            }
            res.send(result);
        })

    })
  });

  router.post('/authenticate', function(req, res){
    var email=req.body.email;
    var password = req.body.password;
    User.findOne({'email':email},(err,user)=>{
        if (err){
            return res.json({error: true});
        }
        if (!user){
             res.json({message: 'No user found.'});
            
        }
        if (!user.validPassword(password)) {
            return res.send(null, false, {message: 'Wrong password.'});
        }
        console.log(user);
        var payload = {
            id: user.id
        };
        var token = jwt.encode(payload, cfg.jwtSecret,{
            expiresIn: 10080 
        });
        res.json({
            token: token
        });
    })
  });
  router.get('/profile',requireAuth, (req, res) => {
    Console.log('authenticated');
    res.send('profile is authenicated');
  });
 // let token = jwt.sign(user,config.jwt_secret, {
        //     expiresIn: 1440 // expires in 1 hour
        // });
        // res.json({error:false, token: token});

// router.post('/login', (req, res) => {

// });
// router.get('/loglists',function (req, res) {
//     loggers.find({})
//     .exec(function(err,logs){
//         if(err){
//             res.send('error has occured')
//         }else{
//              res.json(logs)
//              console.log(logs)
//         }
//     })
// });

// router.post('/newuser', (req, res) => {
//   var  newLoggers = new loggers();
//     newLoggers.name=req.body.name;
//     newLoggers.password=req.body.password;

//     newLoggers.save(function(err,data){
//         if(err){
//             console.log('error is occured  in post')
//         }else{
//             res.send(data);
//         }
//     })
// });
// router.put('/newuser/:id', (req, res) => {
//     loggers.findOneAndUpdate({
//         _id:req.params.id
//     },{$set:{
//         password:req.body.password
//     }},{upsert:true},function(err,newuser){
//         if(err){
//             console.log('error is occured  in post')
//         }else{
//             res.send('sucessfully updated');
//         }
//     })
// })

//   router.get('/mani',function(req,response){
//       response.send('hiiii')
//   })

module.exports = router;