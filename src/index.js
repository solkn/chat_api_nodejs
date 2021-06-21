var express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');
  
const userRoute = require("routes/user");
const chatRoute = require("routes/chat");

  mongoose.Promise = global.Promise;
  var url = "mongodb://localhost/chatdb";
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


app.use("/api/user",userRoute);

app.use("/api/chat",chatRoute);


port = process.env.PORT || 8080,n


app.listen(port,function(){
     console.log("server is running on: "+port);
});
