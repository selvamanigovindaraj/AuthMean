const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
var users = require('../models/user.model') 
var cfg = require('../config/config');  
 
var params = {  
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports = function(passport) {  
    passport.use( new JwtStrategy(params, function(payload, done) {
       var userId= payload.id
        users.findById(userId, function (err, user) {
            if (err) {
                return done(err, false);
              }
              if (user) {
                done(null, user);
              } else {
                done(null, false);
              }
    });
})
);
}
//     passport.use(strategy);
   
// });};