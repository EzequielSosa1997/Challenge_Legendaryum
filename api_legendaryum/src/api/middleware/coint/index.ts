import { STATUS } from "@/api/util/statusHTTP";
import { typeMiddleware } from "../types";

export const checkGetById: typeMiddleware = (req, res, next) => {
  try {
    if (typeof req.params?.id !== "string" || req.params?.id === "")
      return res.status(STATUS.BAD_REQUEST).json({ content: "an id with format must be placed" })
    next();
  } catch (error) {
    if (error instanceof Error)
      return res.status(STATUS.ERROR_SERVER).json({ content: error.message });
  }
};
