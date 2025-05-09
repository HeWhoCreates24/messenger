const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chats.js");
const port = process.env.PORT || "8080";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let main = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
};

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  res.render("chats.ejs", { chats });
});

app.post("/chats", async (req, res) => {
  let newChat = req.body;
  newChat.createdAt = new Date();
  await Chat.insertOne(newChat)
    .then(() => {
      res.redirect("/chats");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/chats/:id", async (req, res) => {
  let { id } = req.params;
  Chat.findById(id)
    .then((chat) => {
      res.render("chatDetails.ejs", { chat });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/chats/:id", (req, res) => {
  let { id } = req.params;
  Chat.findByIdAndDelete(id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.patch("/chats/:id", (req, res) => {
  let { id } = req.params;
  let newMsg = req.body.msg;
  Chat.findByIdAndUpdate(id, { msg: newMsg, createdAt: new Date() })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/start", (req, res) => {
  res.render("start.ejs");
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
