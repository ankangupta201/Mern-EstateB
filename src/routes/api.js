const router = require("express").Router();
const passport = require("passport");
const { register, login } = require("../controllers/AuthController");
const test = require("../controllers/test");
const {
  UpdateUser,
  UpdatePassword,
} = require("../controllers/UserProfileController");
const { updateUser } = require("../utils/responseMessage");

router.post("/register", register);
router.post("/login", login);
router.put(
  "/update-user/:id",
  passport.authenticate("jwt", { session: false }),
  UpdateUser
);
router.put(
  "/update-user-password/:id",
  passport.authenticate("jwt", { session: false }),
  UpdatePassword
);
router.get("/test", passport.authenticate("jwt", { session: false }), test);

module.exports = router;
