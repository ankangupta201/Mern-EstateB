const { User } = require("../models/db");
const { ObjectId } = require("mongodb");
const { z } = require("zod");
const { updateUser } = require("../utils/responseMessage");
const { code } = require("../utils/httpcode");
const bcrypt = require("bcrypt");

module.exports = {
  UpdateUser: async function (req, res, next) {
    try {
      console.log(req.user._id);
      const data = req.body;
      const id = new ObjectId(req.params.id);
      if (!req.user._id.equals(id)) {
        res
          .status(code.forbidden)
          .json({ status: false, message: updateUser.error.permissionDenied });
      }
      const updateSchema = z.object({
        first_name: z
          .string()
          .min(3, { message: "First name should be Minimum 3 charecters" })
          .max(20, { message: "First name should be Maximum 20 charecters" })
          .optional(),
        last_name: z
          .string()
          .min(3, { message: "Last name should be Minimum 3 charecters" })
          .max(20, { message: "First name should be Maximum 20 charecters" })
          .optional(),
        email: z.string().email({ message: "Invalis Email Addess" }).optional(),
      });

      const updateData = updateSchema.parse(data);
      const updatedUser = await User.findByIdAndUpdate(id, {
        $set: updateData,
      });
      const userWithoutPassword = { ...updatedUser.toObject() };
      delete userWithoutPassword.password;
      if (updateUser) {
        res.status(code.ok).json({
          status: true,
          message: updateUser.success.updated,
          data: userWithoutPassword,
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        next(error);
      } else {
        res.status(code.badRequest).json({
          status: false,
          message: updateUser.error.error,
          error: error.errors || "Internal Server Error",
        });
      }
    }
  },
  UpdatePassword: async function (req, res, next) {
    const id = new ObjectId(req.params.id);
    const { current_password, new_password } = req.body;

    try {
      console.log(id, req.user._id.equals(id));
      if (!req.user._id.equals(id)) {
        return res.status(code.forbidden).json({
          status: false,
          message: updateUser.error.permissionDenied,
        });
      }
      const updatePasswordSchema = z.object({
        current_password: z.string().min(8, {
          message: "Current password should be at least 8 characters",
        }),
        new_password: z
          .string()
          .min(8, { message: "New password should be at least 8 characters" }),
      });
      updatePasswordSchema.parse({ current_password, new_password });
      const user = await User.findById(id);
      if (!user) {
        return res.status(code.notFound).json({
          status: false,
          message: updateUser.error.userNotFound,
        });
      }

      const isPasswordMatch = await bcrypt.compare(
        current_password,
        user.password
      );
      if (!isPasswordMatch) {
        return res.status(code.unauthorized).json({
          status: false,
          message: updateUser.error.passwordMatch,
        });
      }

      // Hash the new password
      const hashedNewPassword = await bcrypt.hash(new_password, 10);

      // Update the user's password
      user.password = hashedNewPassword;
      await user.save();

      res.status(code.ok).json({
        status: true,
        message: updateUser.success.updated,
      });
    } catch (error) {
      console.error(error);
      if (error instanceof z.ZodError) {
        next(error);
      } else {
        res.status(code.internalServerError).json({
          status: false,
          message: updateUser.error.error,
          error: error.message,
        });
      }
    }
  },
};
