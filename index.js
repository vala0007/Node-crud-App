const express = require('express');
const path = require('path');
const router = require('./routes/api/member')
const app = express();

//enable cross origin cors for all plateforms
app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
    next();
  
  });

//var bodyParser = require('body-parser')

const port = process.env.PORT || 5000;

//body parser for insert
app.use(express.json());

app.use(express.urlencoded({extended:false}))


app.use('/api/members',router);



app.listen(port,()=>{
    console.log(`server is running on port ${5000}`);
})