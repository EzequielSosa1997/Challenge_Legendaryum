import { IRoomSchema } from "@/core/room";
import { Schema } from "redis-om";
import { IShemeRedis } from "../type";

const infoRoom: { [index in keyof IRoomSchema]: IShemeRedis } = {
  id: { type: "string" },
  nameRoom: { type: "string" },
  peopleId: { type: "string[]" },
  coinsId: { type: "string[]" },
  dimensionX: { type: "number" },
  dimensionZ: { type: "number" },
  dimensionY: { type: "number" },
  expireCointDate: { type: "date" }
};


export const roomSchema = new Schema("room", infoRoom);
