var express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');

  mongoose.Promise = global.Promise;
  var url = "mongodb://localhost/messenger";
mongoose.connect(url,
              {
                useUnifiedTopology:true,
                useNewUrlParser:true
              });
var databaseConnection = mongoose.connection;
if(!databaseConnection){
    console.log("database not connected");
}else{
    console.log("databse connected successfully");
}

app.use(bodyParser.urlencoded({
   extended: true 
  }));
app.use(bodyParser.json());

const userRoute = require("./routes/user_route");
const chatRoute = require("./routes/chat_route");

app.use("/api/user",userRoute);

app.use("/api/chat",chatRoute);


port = process.env.PORT || 8080,


app.listen(port);


console.log('server run on: ' + port);