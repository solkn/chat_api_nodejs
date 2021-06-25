var express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  dotenv = require('dotenv');

  dotenv.config();

  
const userRoute = require('./routes/user');
//const user2Route = require('./routes/message');
const messageRoute = require('./routes/message');

  mongoose.Promise = global.Promise;

 // var url = "mongodb://localhost/chatdb";
mongoose.connect(process.env.DB_CONNECTION,
              {
                useUnifiedTopology:true,
                useNewUrlParser:true,
                useCreateIndex: true,
                useFindAndModify: true,
              }
              //()=>console.log("database connected!")
              ).then(console.log("database connected correctly!"))
              .catch((err)=>console.log(err));
// var databaseConnection = mongoose.connection;
// if(!databaseConnection){
//     console.log("database not connected");
// }else{
//     console.log("databse connected successfully");
// }

app.use(bodyParser.urlencoded({
   extended: true 
  }));
app.use(bodyParser.json());

app.use(express.json());

app.use("/api/v1/users",userRoute);

app.use("/api/v1/messages",messageRoute);

/**
 * @param {object} req
 * @param {object} res
 * @param {function} next
*/

app.use("*", (req, res, next) => {
    res.status(400).json({
      status: "error",
      message: `The requested url ${req.originalUrl} doesnot exist`,
    });
    next();
  });

port = process.env.PORT || 8080;


app.listen(port,function(){
     console.log("server is running on: "+port);
});