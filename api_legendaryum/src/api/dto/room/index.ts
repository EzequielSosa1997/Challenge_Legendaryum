import { getDateNowAddOneHour } from "@/api/util/date";
import { parseCoordinateXYZ, parseDimensionXYZ } from "@/api/util/parseXYX";
import { ICoin, ICoinCreate } from "@/core/coin";
import { IRoom, IRoomCreate } from "@/core/room";
import { randomUUID } from "crypto";

const getDtoCoinCreate = (body: ICoinCreate, id: string): ICoin => ({
  id: randomUUID() as string,
  peopleId: null,
  dimensionXYZ: parseDimensionXYZ({
    dimensionY: 1,
    dimensionX: 1,
    dimensionZ: 1,
  }),
  coordinateXYZ: parseCoordinateXYZ(body),
  roomId: id,
});

export const getDtoRoomCreate = (body: IRoomCreate): IRoom => {
  const id = randomUUID();
  return {
    id,
    nameRoom: body.nameRoom,
    peopleId: [],
    expireCointDate: getDateNowAddOneHour(),
    coins: body.coins.map((coin): ICoin => getDtoCoinCreate(coin, id)),
    dimensionX: body.dimensionX,
    dimensionY: body.dimensionY,
    dimensionZ: body.dimensionZ,
  };
};
