var jwt = require('jsonwebtoken');
var config = require ('../config/config')
module.exports = function(req,res,next) {
  var token = req.headers.Authorization;
  console.log(token);
    if (token) {
    // verifies secret and checks exp
        jwt.verify(token, config.jwt_secret, function(err, decoded) {
            if (err) { //failed verification.
                return res.json({"error": true});
            }
            req.decoded = decoded;
            next(); //no error, proceed
        });
    } else {
        // forbidden without token
        return res.status(403).send({
            "error": true
        });
    }
}
