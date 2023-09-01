import { generateRandomNumber } from "@/api/util/math";
import { parseCoordinateXYZ } from "@/api/util/parseXYX";
import { checkRepeatContentArray } from "@/api/validation/helpers/checkDataEqualArray";
import { ICoin } from "@/core/coin";
import { ICoordinates } from "@/core/coordinates";
import { IRoomSchema } from "@/core/room";
import { randomUUID } from "crypto";

const createCoin = ({ coordinateX, coordinateZ, coordinateY, roomId }: ICoordinates & { roomId: string }): ICoin => {
  return {
    id: randomUUID(),
    roomId: roomId,
    peopleId: null,
    coordinateXYZ: parseCoordinateXYZ({ coordinateZ, coordinateX, coordinateY }),
    dimensionXYZ: parseCoordinateXYZ({ coordinateZ: 1, coordinateX: 1, coordinateY: 1 }),
  }
}

export const getCoinsWithCordinate = ({ dimensionX, dimensionY, dimensionZ, id }: IRoomSchema) => {
  while (true) {
    const coins = Array.from({ length: 9 }).map((): ICoin => {
      const coordinateX = generateRandomNumber(1, dimensionX)
      const coordinateY = generateRandomNumber(1, dimensionY)
      const coordinateZ = generateRandomNumber(1, dimensionZ)
      return createCoin({ coordinateX, coordinateY, coordinateZ, roomId: id })
    })
    const coordinates = coins.map(({ coordinateXYZ }) => coordinateXYZ)
    if (checkRepeatContentArray(coordinates)) continue
    return coins
  }
}
