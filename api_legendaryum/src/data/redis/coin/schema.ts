import { Schema } from "redis-om";
import { IShemeRedis } from "../type";
import { ICoin } from "@/core/coin";

const infoCoin: { [index in keyof ICoin]: IShemeRedis } = {
  id: { type: "string" },
  dimensionXYZ: { type: "string" },
  roomId: { type: "string" },
  peopleId: { type: "string" },
  coordinateXYZ: { type: "string" },
};

export const coinSchema = new Schema("coin", infoCoin);
