const globalErrorHandler = (err, req, res, next) => {
  console.error(err);
  if (err.name === "Error") {
    return res.status(400).json({ error: "error occurred " + err });
  }
  res
    .status(500)
    .json({ status: false, error: "Internal Server Error " + err });
};

module.exports = {
  globalErrorHandler,
};
