import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import validator from "koa-yup-validator";

export const app = new Koa();

export const startWebServer = () => {
  const register = require("./register");
  const login = require("./login");
  const auth = require("./auth");
  
  app.use(bodyParser());
  
  const router = new Router();
  
  const helloWorld = (ctx) => {
    ctx.body = "hello auth";
  };
  
  router
    .get("/status", helloWorld)
    .post("/login", validator(login.schema), login.handler)
    .post("/register", validator(register.schema), register.handler)
    .get("/", validator(auth.schema, { path: "request.query" }), auth.handler);

  const port = process.env.PORT || 80;
  app.use(router.routes()).use(router.allowedMethods());
  app.listen(port, () => {
    console.log("auth web server started on port: " + port);
  });
};
