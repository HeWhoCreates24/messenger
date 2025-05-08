const mongoose = require("mongoose");
const Chat = require("./models/chats.js");

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

let initChats = [
  {
    from: "neha",
    to: "priya",
    msg: "hello priya",
    createdAt: new Date(),
  },
  {
    from: "priya",
    to: "neha",
    msg: "hello wassup?",
    createdAt: new Date(),
  },
  {
    from: "neha",
    to: "priya",
    msg: "my name is neha, can't you read?",
    createdAt: new Date(),
  },
  {
    from: "wassup",
    to: "neha",
    msg: "why are you jealous if she's talkin to me",
    createdAt: new Date(),
  },
  {
    from: "why",
    to: "wassup",
    msg: "hell no why would i be jealous?",
    createdAt: new Date(),
  },
  {
    from: "jealous",
    to: "why",
    msg: "you can never be me why...",
    createdAt: new Date(),
  },
  {
    from: "me",
    to: "jealous",
    msg: "ofc he cannot, cause its me, i am me",
    createdAt: new Date(),
  },
  {
    from: "why",
    to: "me",
    msg: "hey, my pronouns are does/did",
    createdAt: new Date(),
  },
  {
    from: "hey",
    to: "why",
    msg: "so? what do you want me to do?",
    createdAt: new Date(),
  },
  {
    from: "what",
    to: "hey",
    msg: "not now hey!! we just finished...",
    createdAt: new Date(),
  },
  {
    from: "we",
    to: "hey",
    msg: "i don't know what's going on with what...",
    createdAt: new Date(),
  },
];

Chat.insertMany(initChats)
  .then(() => {
    mongoose.disconnect();
  })
  .catch((err) => {
    console.log(err);
  });
