import * as Yup from "yup";
import jwt from "jsonwebtoken";

export const schema = Yup.object().shape({
  token: Yup.string().required(),
});

export const handler = (ctx) => {
  try {
    const payload = jwt.verify(ctx.request.query.token, process.env.JWT_SECRET);
    ctx.body = payload;
  } catch (error) {
    ctx.body = {
      error: error.message,
      code: error.code,
    };
  }
  console.log("auth handler");
};
