import RoomService from "@/api/services/room";
import { DEFAULT_ROOM } from "../environment";
import { templateRoom } from "./templateRoom";

export const loadRoomDefault = async () => {
  try {
    if (!DEFAULT_ROOM) return;
    const serviceRoom = new RoomService();
    const {
      content: [firstRoom],
    } = await serviceRoom.getAll();
    if (firstRoom) return;
    await serviceRoom.create(templateRoom);
  } catch (error) {
    console.log({ error })
    console.log("room service error")
  }
};
