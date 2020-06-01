const express = require("express");
const studentsRouter = require("./routers/studentsRouter");
const teachersRouter = require("./routers/teachersRouter");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json()); //using middleware

app.get("/", (req, res) => {
  res.send("<h1>Student App Home!</h1>");
});

app.use("/students", studentsRouter);

app.use("/teachers", teachersRouter);

app.listen(8080, () => {
  console.log("Server Running!");
});
