const { User } = require("../models/db");
const { z } = require("zod");
const bcrypt = require("bcrypt");
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

    res
      .status(201)
      .json({ status: true, message: "User created Successfully", user: user });
  } catch (error) {
    next(error);
  }
};

module.exports = Auth;
