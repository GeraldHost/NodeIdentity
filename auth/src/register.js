import * as Yup from "yup";
import { hash } from "bcrypt";
import mongoose from "mongoose";

const Users = mongoose.model("Users");

export const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string()
    .min(8, "passwords must be more than 8 characters long")
    .required(),
});

const createUser = ({ email, password }) =>
  Users.create({ email, password });

export const handler = async (ctx) => {
  const email = ctx.request.body.email.toLowerCase();
  const password = ctx.request.body.password;

  try {
    const hashPassword = await hash(password, 10);
    const user = await createUser({ email, password: hashPassword });
    ctx.body = user;
  } catch (error) {
    ctx.body = { error: error.message, code: error.code };
  }
};
