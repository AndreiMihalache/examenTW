const express = require("express");
const cors = require("cors");
const { sequelize, associate } = require("./db/sequelize");
const jobPostingRouter = require("./routers/jobposting-router");
const candidateRouter = require("./routers/candidate-router");
require("./models/jobposting");
require("./models/candidate");

const app = express();
app.use(express.json());
app.use(cors());
app.use(jobPostingRouter);
app.use(candidateRouter);

app.put("/db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    associate();
    console.log("Models synced");
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
});

app.all("/*", (req, res) => {
  res.status(404).send({ error: "Not a valid endpoint" });
});

module.exports = app;
