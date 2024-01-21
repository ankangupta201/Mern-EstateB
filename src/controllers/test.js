module.exports = function (req, res, next) {
  res.status(201).json({ status: true, auth: true });
};
