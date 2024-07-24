const connectToMongo = require("./db.js");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

connectToMongo();

const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users.js");
const authRoute = require("./routes/auth.js");
const postRoute = require("./routes/posts.js");

const PORT = 8000;

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.get("/", (req, res) => {
  res.send("Welcome to homepage");
});

app.listen(PORT, () => {
  console.log("App is listening at port :", PORT);
});
