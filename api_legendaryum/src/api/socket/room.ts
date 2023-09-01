import { Socket } from "socket.io";
import RoomService from "../services/room";
import { DefaultEventsMap } from "socket.io/dist/typed-events";


export class RoomSocket {
  private socket: Socket<DefaultEventsMap>;
  private ROOM_CHOISE = "roomChoise"
  constructor(data: Socket<DefaultEventsMap>) {
    this.socket = data
  }
  async getIdsRoom() {
    try {
      const roomService = new RoomService();
      const getIdsRoom = await roomService.getAllOnlyId();
      this.socket.emit(this.ROOM_CHOISE, getIdsRoom);
    } catch (error) {
      this.socket.emit(this.ROOM_CHOISE, { content: "could not get room ids" });
    }
  }

}
