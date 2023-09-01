import "module-alias/register";
import { PORT } from "@config/environment";
import { app } from "./app";
import { initServer } from "./config/server";
import { initSocket } from "./config/socket";
import { socketStartConnection } from "./api/socket";

const server = initServer(app);
const io = initSocket(server);
socketStartConnection(io);
server.listen(PORT);
console.log(`[INFO] Server listening on ${PORT}`);
