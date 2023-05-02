/** @format */

const express = require("express");
const { connection } = require("./db");
const { userRoute } = require("./routes/user.route");
const { postRoute } = require("./routes/post.route");
const { auth } = require("./middlewere/auth");

const app = express();
app.use(express.json());

app.use("/users", userRoute);

app.use(auth);
app.use("/posts", postRoute);

app.listen(8080, async () => {
  try {
    await connection;
    console.log("connected to DB");
  } catch (err) {
    console.log("can't connected to DB");
  }
  console.log("port is running at 8080");
});
