const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chats.js");
const User = require("./models/users.js");
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

app.get("/chats/user/:user", async (req, res) => {
  let {user:userName} = req.params;
  let chats = await Chat.find();
  let user = await User.findOne({username: userName});
  res.render("chatsLoggedIn.ejs", {chats, user});
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

app.post("/chats/user/:username", async (req, res) => {
  let {username} = req.params; 
  let newChat = req.body;
  newChat.createdAt = new Date();
  await Chat.insertOne(newChat)
    .then(() => {
      res.redirect(`/chats/user/${username}`);
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

app.post("/start", (req, res) => {
  let newUser = req.body;
  if (newUser.email == undefined) {
    User.findOne({username: newUser.username})
    .then(result => {
      if(result.password == newUser.password){
        res.redirect(`/chats/user/${result.username}`);
      }else{
        res.send("<script>alert('Wrong password'); document.location.href = '/start'</script>");
      }
    })
    .catch((err) => {
        console.log(err.code);
        res.send("<script>alert('User not found'); document.location.href = '/start'</script>");
      });
    // console.log("login");
  } else {
    // console.log("signup");
    User.insertOne(newUser)
      .then((result) => {
        console.log(result);
      res.redirect(`/chats/user/${result.username}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
