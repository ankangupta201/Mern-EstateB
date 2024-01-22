const router = require("express").Router();
const passport = require("passport");
const { register, login } = require("../controllers/AuthController");
const test = require("../controllers/test");


router.post("/register", register);
router.post("/login", login);
router.get("/test", passport.authenticate("jwt", { session: false }), test);

module.exports = router;
