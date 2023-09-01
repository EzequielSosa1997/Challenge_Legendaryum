import { Server } from "socket.io";
import { Server as TYPESERVER } from "http";

export const initSocket = (server: TYPESERVER) => {
  return new Server(server, { cors: { origin: ["http://localhost:3000"] } });
};
