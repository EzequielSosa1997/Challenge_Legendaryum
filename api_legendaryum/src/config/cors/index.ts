import { Express } from "express";
import cors from "cors";

export const initCors = (app: Express) => {
  app.use(cors({ origin: ["http://localhost:3000", "*"] }));
};
