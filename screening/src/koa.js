import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import validator from "koa-yup-validator";

import { authMiddleware } from "./authMiddleware";

export const app = new Koa();
app.use(bodyParser());

const router = new Router();

const helloWorld = (ctx) => {
  ctx.body = "hello auth";
};

router
  .get("/status", helloWorld)
  .get("/", authMiddleware, helloWorld);

export const startWebServer = () => {
  const port = process.env.PORT || 80;
  console.log("auth web server started on port: " + port);
  app.use(router.routes()).use(router.allowedMethods());
  app.listen(port);
};
