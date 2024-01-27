const { z } = require("zod");

const handleZodError = (error, res) => {
  if (error instanceof z.ZodError) {
    res
      .status(400)
      .json({ status: false, type: "validation", error: error.errors });
  } else {
    console.error(error);
    res.status(500).send({ status: false, message: "Internal Server Error" });
  }
};

const zodErrorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof z.ZodError) {
    handleZodError(err, res);
  } else {
    next(err);
  }
};

module.exports = {
  zodErrorHandlerMiddleware,
};
