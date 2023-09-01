import { Express } from "express";
import { createServer } from "http";

export const initServer = (app: Express) => {
  return createServer(app);
};
