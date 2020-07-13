import jwt from "jsonwebtoken";
import * as Yup from "yup";
import { compare } from "bcrypt";
import { User } from "./mysql";

export const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const userByEmail = (email) =>
  User.where({ email })
    .fetch({ require: true })
    .then((user) => user.toJSON());

export const handler = async (ctx) => {
  const email = ctx.request.body.email.toLowerCase();
  const password = ctx.request.body.password;

  try {
    const { password: storedPassword, ...user } = await userByEmail(email);
    const validPassword = await compare(password, storedPassword);
    if (validPassword) {
      const token = jwt.sign(
        {
          data: { user_id: user.id },
        },
        process.env.JWT_SECRET,
        { expiresIn: 60 * 60 * 24 * 90 }
      );
      ctx.body = {
        user,
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
