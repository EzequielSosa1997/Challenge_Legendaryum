import Router from "express";
import { STATUS } from "../util/statusHTTP";
import CointService from "../services/coint";
import { checkGetById } from "../middleware/coint";

const router = Router();

const coinServise = new CointService();

router.get("/getAll", async (_req, res) => {
  try {
    const result = await coinServise.getAll();
    return res.status(STATUS.OK).json(result);
  } catch (error) {
    if (error instanceof Error)
      return res.status(STATUS.ERROR_SERVER).json({ content: error.message });
  }
});

router.get("/getById/:id", checkGetById, async (req, res) => {
  try {
    const result = await coinServise.getById(
      req.params?.id as unknown as string
    );
    return res.status(STATUS.OK).json(result);
  } catch (error) {
    if (error instanceof Error) {
      const STATUS_ERROR =
        error.message === "not found" ? STATUS.NOT_FOUND : STATUS.ERROR_SERVER;
      return res.status(STATUS_ERROR).json({ content: error.message });
    }
  }
});

router.delete("/delete/:id", checkGetById, async (req, res) => {
  try {
    const result = await coinServise.delete(
      req.params?.id as unknown as string
    );
    return res.status(STATUS.OK).json(result);
  } catch (error) {
    if (error instanceof Error) {
      const STATUS_ERROR =
        error.message === "not found" ? STATUS.NOT_FOUND : STATUS.ERROR_SERVER;
      return res.status(STATUS_ERROR).json({ content: error.message });
    }
  }
});

export default router;
