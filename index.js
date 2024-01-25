//imports
const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("passport");
require("./src/config/passport")(passport);
require("dotenv").config();
const { connect } = require("./src/models/db");
const {
  zodErrorHandlerMiddleware,
} = require("./src/middlewares/ValidationError");
const { globalErrorHandler } = require("./src/middlewares/GlobalError");
const router = require("./src/routes/api");


/////middlewares
app.use(cors());
app.use(express.json());


///passport js
app.use(passport.initialize());


app.use("/api", router);

//test route
app.get("/", (req, res) => {
  res.send("Successful Response");
});


///error handeling
app.use(zodErrorHandlerMiddleware);
app.use(globalErrorHandler);

/// Start Server
connect().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`);
  });
});
