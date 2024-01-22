const { User } = require("../models/db");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Auth = {};
Auth.register = async function register(req, res, next) {
  try {
    const data = req.body;
    const registrationSchema = z
      .object({
        first_name: z.string().min(3).max(20),
        last_name: z.string().min(3).max(20),
        email: z.string().email(),
        password: z.string().min(8),
        confirm_password: z.string(),
      })
      .refine((data) => data.password === data.confirm_password, {
        message: "Passwords don't match",
        path: ["confirm_password"],
      });
    registrationSchema.parse(data);

    const hashPassword = await bcrypt.hash(data.password, 10);

    const user = await User.create({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: hashPassword,
    });
    const signedToken = generateToken(user);

    const userWithoutPassword = { ...user.toObject() };
    delete userWithoutPassword.password;

    res.status(201).json({
      status: true,
      message: "User created Successfully",
      user: userWithoutPassword,
      token: signedToken,
    });
  } catch (error) {
    next(error);
  }
};

Auth.login = async function (req, res, next) {
  try {
    const data = req.body;
    const loginSchema = z.object({
      email: z.string().email(),
      password: z.string(),
    });
    loginSchema.parse(data);

    const user = await User.findOne({ email: data.email });
    if (!user) {
      res.status(401).json({ status: false, message: "User Not Found" });
    }
    const result = await bcrypt.compare(data.password, user.password);
    if (result) {
      const signedToken = generateToken(user);
      const userWithoutPassword = { ...user.toObject() };
      delete userWithoutPassword.password;
      return res.status(201).json({
        status: true,
        message: "User loged in successfully",
        user: userWithoutPassword,
        token: signedToken,
      });
    } else {
      res
        .status(401)
        .json({ status: false, message: "Credentials is wrong" });
    }
  } catch (err) {
    next(err);
  }
};

function generateToken(user) {
  const id = user._id;
  const expiresIn = "1d";
  const payload = {
    sub: id,
    iat: Date.now(),
  };
  const signedToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expiresIn,
    algorithm: "HS256",
  });
  return "Bearer " + signedToken;
}

module.exports = Auth;
