import { startWebServer } from "./koa";

(async function () {
  try {
    startWebServer();
  } catch (error) {
    console.log(error)
    console.error("app not started");
  }
})();
