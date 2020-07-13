import { startWebServer } from "./koa";

try {
  startWebServer();
} catch(error) {
  console.error("app not started");
}
