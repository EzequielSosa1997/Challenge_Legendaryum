import { Server } from "socket.io";
import { PersonSocket } from "./person";
import { RoomSocket } from "./room";

export const socketStartConnection = (socket: Server) => {
  socket.on("connection", async (connection) => {
    const roomSocket = new RoomSocket(connection);
    const personSocket = new PersonSocket(connection);
    await roomSocket.getIdsRoom();
    await personSocket.createAndSearch();
    await personSocket.search();
  });
};
