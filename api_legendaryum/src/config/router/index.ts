import { Express } from "express"
import router from "../../api/controllers"

export const initRouter = (app: Express) => {
  app.use("/", router)
}
