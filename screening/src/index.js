import { mongoConnect } from "./mongo";
import { startWebServer } from "./koa";

(async function () {
  try {
    await mongoConnect();
    startWebServer();
  } catch (error) {
    console.error("app not started");
  }
})();
