const PassportJWT = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const { User } = require("../models/db");
require("dotenv").config();

const options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  algorithms: ["HS256"],
};
async function verify(payload, done) {
  try {
    const user = await User.findOne({ _id: payload.sub });
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (err) {
    done(err, false);
  }
}

module.exports = function (passport) {
  passport.use(new PassportJWT(options, verify));
};
