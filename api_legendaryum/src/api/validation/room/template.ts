import { ICoinCreate } from "@/core/coin";
import { IRoomCreate } from "@/core/room";

export const coinTemplate: ICoinCreate = {
  coordinateX: 0,
  coordinateZ: 0,
  coordinateY: 0,
};

export const createRoomTemplate: IRoomCreate = {
  nameRoom: "",
  coins: [coinTemplate],
  dimensionX: 0,
  dimensionY: 0,
  dimensionZ: 0,
};

export const createRoomkeys = Object.keys(createRoomTemplate);

export const coinsKeys = Object.keys(coinTemplate);
