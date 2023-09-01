import { STATUS } from "@util/statusHTTP";
import { Express, NextFunction, Request, Response, json } from "express";

export const initJson = (app: Express) => {
  app.use(json());
  app.use((err: any, _: Request, res: Response, next: NextFunction) => {
    if (err instanceof SyntaxError && "body" in err) {
      return res
        .status(STATUS.BAD_REQUEST)
        .json({ content: "json syntax error" });
    }
    next();
  });
};
