const { User } = require("../models/db");
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { newUser } = require("../utils/responseMessage");
const { code } = require("../utils/httpcode");
const { v4: uuidv4 } = require("uuid");
const { fromZodError } = require("zod-validation-error");

require("dotenv").config();

const Auth = {};
Auth.register = async function register(req, res, next) {
  try {
    const data = req.body;
    const registrationSchema = z
      .object({
        first_name: z
          .string()
          .min(3, { message: "First name should be Minimum 3 charecters" })
          .max(20, { message: "First name should be Maximum 20 charecters" }),
        last_name: z
          .string()
          .min(3, { message: "Last name should be Minimum 3 charecters" })
          .max(20, { message: "First name should be Maximum 20 charecters" }),
        email: z.string().email({ message: "Invalis Email Addess" }),
        password: z
          .string()
          .min(8, { message: "Password should be minimum 8 charecters" }),
        confirm_password: z.string(),
      })
      .refine((data) => data.password === data.confirm_password, {
        message: "Passwords don't match",
        path: ["confirm_password"],
      });
    registrationSchema.parse(data);

    const hashPassword = await bcrypt.hash(data.password, 10);

    const emailExist = await User.findOne({ email: data.email });
    if (emailExist != null) {
      res.status(code.badRequest).json({
        status: false,
        message: newUser.error.alreadyRegistered,
      });
    }

    const user = await User.create({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: hashPassword,
    });
    // const signedToken = generateToken(user);

    const userWithoutPassword = { ...user.toObject() };
    delete userWithoutPassword.password;

    res.status(code.created).json({
      status: true,
      message: newUser.success.created,
      user: userWithoutPassword,
      // token: signedToken,
    });
  } catch (error) {
    const validationError = fromZodError(error);
    // the error is now readable by the user
    // console.log(validationError.toString());
    // res.status(code.badRequest).json({
    //   status: false,
    //   message: validationError.toString(),
    // });
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

      return res.status(code.ok).json({
        status: true,
        message: newUser.success.logedIn,
        user: userWithoutPassword,
        token: signedToken,
      });
    } else {
      res.status(401).json({ status: false, message: "Credentials are wrong" });
    }
  } catch (error) {
    // const validationError = fromZodError(error);
    // res.status(code.badRequest).json({
    //   status: false,
    //   message: validationError.toString(),
    // });
    next(error);
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
  return signedToken;
}

module.exports = Auth;
