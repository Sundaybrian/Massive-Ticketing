const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const middlewares = require("./middlewares");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(compression());
app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to ticketing app api",
  });
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
