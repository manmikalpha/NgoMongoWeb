//Step 1: Database connection
const mongoose = require("mongoose");

//mongodb://127.0.0.1:27017/dbname
//const conn_str = "mongodb://localhost:27017/tcet";
const conn_str =
  "mongodb://root:root%401234@cluster0-shard-00-00.djutj.mongodb.net:27017,cluster0-shard-00-01.djutj.mongodb.net:27017,cluster0-shard-00-02.djutj.mongodb.net:27017/NGO?ssl=true&replicaSet=atlas-gfhq6d-shard-0&authSource=admin&retryWrites=true&w=majority";
//https://manmiktest.herokuapp.com/ | https://git.heroku.com/manmiktest.git

mongoose
  .connect(conn_str, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected successfully..."))
  .catch((error) => console.log(error));

//Step 2: Create Schema (Java Class)
const userSchema = new mongoose.Schema({
  name: String,
  address: Object,
  sector: String,
  contact: String,
  members: Object,
});

//Step 3: Create collection Object (model)
// MAPPING
const userObject = new mongoose.model("informations", userSchema);

exports.User = userObject;
