import { Router } from "express";
import { STATUS } from "@util/statusHTTP";

const router = Router();

router.get("/", async (_req, res) =>
  res.status(STATUS.OK).json({ content: true })
);

export default router;
