const express = require("express");
const { connectMongoDb } = require("./connection");
const { logReqRes } = require("./middlewares");
const { userRouter } = require("./routes/user.routes");
const { taskRouter } = require("./routes/task.routes");
const { auth } = require("./middlewares/auth.middleware");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.SERVER_PORT || 8080;
const URL = process.env.MONGO_URL;

//MIDDLEWARE
app.use(cors({
  origin: '*',
}));
// app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logReqRes("log.txt"));
app.use("/api/users", userRouter);
app.use("/api/tasks", auth, taskRouter);

//default route ServerSideRendering
app.get("/", (req, res) => {
  if (req.url === "favicon.ico") return;
  res.setHeader("X-Devlop-By", "Abhijit-Barman"); //Custom Header Add "X"
  // return res.status(200).json({ message: "hello world" });
  return res
    .status(200)
    .send(
      "<h1>--------------------------------------------------------------GREEN💚MENTOR----------------------------------------------------------</h1>"
    );
});

app.get("/refresh", (req, res) => {
  const refresh_token = req.headers.authorization?.split(" ")[1];
  const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET);
  if (decoded) {
    const token = jwt.sign({ email: decoded.email }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    res.send(token);
  } else {
    res.send({ msg: "Invalid Refresh Token!" });
  }
});

app.listen(PORT, async () => {
  try {
    await connectMongoDb(URL);
    console.log(`MongoDB Connected & App is running at ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
