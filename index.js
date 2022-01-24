const express = require("express");
const port = 8080;
const path = require("path");

const user_model = require("./users_module");
const User = user_model.User;

const app = express();
app.use(express.json());

app.use(express.static(__dirname + "/public/"));

var cors = require("cors");
app.use(cors());

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/start.html", function (req, res) {
  res.sendFile(path.join(__dirname + "/start.html"));
});

app.get("/index.html", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/script.js", function (req, res) {
  res.sendFile(path.join(__dirname + "/script.js"));
});

app.get("/edit.html", function (req, res) {
  res.sendFile(path.join(__dirname + "/edit.html"));
});

app.get("/add.html", function (req, res) {
  res.sendFile(path.join(__dirname + "/add.html"));
});
// app.get("/", (req, res) => {
//   res.sendFile(index.html());
// });

app.get("/user", async (req, res) => {
  let data = await User.find().sort({ _id: -1 });
  res.send(data);
});

app.get("/user/:id", async (req, res) => {
  console.log(req.params.id);
  let data = await User.find({ _id: req.params.id });
  res.send(data[0]);
});

app.post("/user", async (req, res) => {
  console.log(req.body);
  let u = await User(req.body);
  let result = u.save();
  res.send(req.body);
});

app.put("/user", async (req, res) => {
  console.log(req.body);

  //User.updateOne({where}, {set});
  let u_data = await User.updateOne(
    { "_id": req.body._id },
    {
      "$set": {
        name: req.body.name,
        address: req.body.address,
        sector: req.body.sector,
        contact: req.body.contact,
        members: req.body.members,
      },
    }
  );

  res.send(u_data);
});

app.delete("/user", async (req, res) => {
  let d_data = await User.deleteOne({ _id: req.body._id });
  res.send(d_data);
});

app.listen(process.env.PORT || port, () => {
  console.log("listening 8080...");
});
