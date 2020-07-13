import jwt from "jsonwebtoken";
import * as Yup from "yup";
import { compare } from "bcrypt";
import mongoose from "mongoose";

const Users = mongoose.model("Users");

export const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const userByEmail = async (email) => {
  const user = await Users.find({ email }).exec();
  if (user.length <= 0) {
    throw new Error("user not found");
  }
  return user[0];
};

export const handler = async (ctx) => {
  const email = ctx.request.body.email.toLowerCase();
  const password = ctx.request.body.password;

  try {
    const user = await userByEmail(email);
    const validPassword = await compare(
      password,
      user.get("password")
    );
    if (validPassword) {
      const token = jwt.sign(
        {
          data: { user_id: user.get("id") },
        },
        process.env.JWT_SECRET,
        { expiresIn: 60 * 60 * 24 * 90 }
      );
      const { password: _, ...userWithoutPassword } = user.toJSON();
      ctx.body = {
        user: userWithoutPassword,
        token,
      };
    } else {
      ctx.body = {
        error: "invalid password",
      };
    }
  } catch (error) {
    ctx.body = {
      error: error.message,
      code: error.code,
    };
  }
};
