import { Router } from "express";
import { Dirent, readdirSync } from "fs";

const router = Router();

const formatRouter = (fileOrFolder: Dirent) => {
  return fileOrFolder.isFile()
    ? fileOrFolder.name.split(".").shift()
    : fileOrFolder.name;
};

const buidRouter = (path: string) =>
  router.use(`/${path}`, require(`./${path}`).default);

const generateRoutes = (path: Dirent) => {
  if (path.name === "" || /index/.test(path.name)) return;
  const controller = formatRouter(path);
  if (!controller) return;
  buidRouter(controller);
};

try {
  readdirSync(__dirname, { withFileTypes: true }).forEach(generateRoutes);
} catch (error: any) {
  console.log({ error })
  process.exit(1);
}

export default router;
