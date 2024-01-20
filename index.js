//imports
const express = require("express");
const app = express();
require("dotenv").config();
const { connect } = require("./src/models/db");
const {
  zodErrorHandlerMiddleware,
} = require("./src/middlewares/ValidationError");
const { globalErrorHandler } = require("./src/middlewares/GlobalError");
const router = require("./src/routes/api");
////
app.use(express.json());
app.use("/api", router);
app.get("/", (req, res) => {
  res.send("Successful Response");
});

app.use(zodErrorHandlerMiddleware);
app.use(globalErrorHandler);

connect().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`);
  });
});
