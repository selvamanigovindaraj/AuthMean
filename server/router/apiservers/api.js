const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

let User = require('./models/user.model');
// var passport = require('passport');
// LocalStrategy = require('passport-local').Strategy;
var _ = require("lodash");
var jwt = require('jsonwebtoken');
var config= require('../config');

var passport = require("passport");
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var db ='mongodb://localhost:27017/profile'
mongoose.connect(db,{
    useMongoClient: true,
    /* other options */
  });

  router.post('/signup', function(req, res){
    let user = new User({
        email: req.body.email,
        password: req.body.password
    });
    user.save(function(err, data){
        if(err){
            return res.json({error: true});
        }
        res.json({error:false});
    })
});

router.post('/authenticate', function(req, res){
    let data = {
        email: req.body.email,
        password: req.body.password
    };
    User.findOne(data).lean().exec(function(err, user){
        if(err){
            return res.json({error: true});
        }
        if(!user){
            return res.status(404).json({'message':'User not found!'});
        }
        console.log(user);

        let token = jwt.sign(user,config.jwt_secret, {
            expiresIn: 1440 // expires in 1 hour
        });
        res.json({error:false, token: token});
    })
});
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