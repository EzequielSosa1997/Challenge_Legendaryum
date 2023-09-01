import express from "express";
import { initCors } from "./config/cors";
import { initRouter } from "./config/router";
import { initJson } from "./config/json";
import { loadRoomDefault } from "./config/init";
import { initCron } from "./cron";
import { initSwagger } from "./config/swagger/init";

const app = express();

initJson(app);
initCors(app);
initRouter(app);
initSwagger(app)

loadRoomDefault();
initCron();
export { app };
