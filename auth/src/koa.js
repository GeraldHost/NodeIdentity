import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import validator from "koa-yup-validator";

import {
  handler as registerHandler,
  schema as registerSchema,
} from "./register";
import { handler as authHandler, schema as authSchema } from "./auth";
import { handler as loginHandler, schema as loginSchema } from "./login";

export const app = new Koa();
app.use(bodyParser());

const router = new Router();

const helloWorld = (ctx) => {
  ctx.body = "hello auth";
};

router
  .get("/status", helloWorld)
  .post("/login", validator(loginSchema), loginHandler)
  .post("/register", validator(registerSchema), registerHandler)
  .get("/", validator(authSchema, { path: "request.query" }), authHandler);

export const startWebServer = () => {
  const port = 3000;
  console.log("auth web server started on port: " + port);
  app.use(router.routes()).use(router.allowedMethods());
  app.listen(port);
};
