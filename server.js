const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
var app = express();
var passport = require('passport');
var api = require ('./server/router/api');
// var auth = require("./server/middleware/passportAuth")(); 


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
 app.use(passport.initialize());

app.use(express.static(path.join(__dirname,'dist')));

app.use('/api',api);


app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname,'dist/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port,()=>{
   console.log(`Running in the server:${port}`)
})