import { Schema } from "redis-om";
import { IShemeRedis } from "../type";
import { IPerson } from "@/core/person";

const infoPerson: { [index in keyof IPerson]: IShemeRedis } = {
  dimensionXYZ: { type: "string" },
  positionOfPersonInXYZ: { type: "string" },
  id: { type: "string" },
  roomId: { type: "string" },
  namePerson: { type: "string" },
  coinsId: { type: "string[]" },
};

export const personSchema = new Schema("person", infoPerson);
