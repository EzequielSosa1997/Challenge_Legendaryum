import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import configSwagger from "./swaggerJSDoc";
import { PORT } from "../environment";

export const initSwagger = (app: Express) => {
  app.use(`/docs`, swaggerUi.serve, swaggerUi.setup(configSwagger));
  console.log(`[INFO] At Docs at http://localhost:${PORT}/docs`);
};
