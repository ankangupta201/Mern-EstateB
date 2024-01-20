const router = require("express").Router();
const { register } = require("../controllers/AuthController");

router.post("/register", register);

module.exports = router;
