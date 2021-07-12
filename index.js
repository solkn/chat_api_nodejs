const express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  dotenv = require('dotenv'),
  userRoute = require("./routes/user"),
  messageRoute = require("./routes/message"),
  roleRoute = require("./routes/role");

  dotenv.config();

  mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB_CONNECTION,
              {
                useUnifiedTopology:true,
                useNewUrlParser:true,
                useCreateIndex: true,
                useFindAndModify: true,
              }
              ).then(console.log("database connected!"))
              .catch((err)=>console.log("database not connected!"));

app.use(bodyParser.urlencoded({
   extended: true 
  }));
app.use(bodyParser.json());

app.use(express.json());

app.use("/api/v1/users",userRoute);

app.use("/api/v1/messages",messageRoute);

app.use("/api/v1/roles",roleRoute);

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