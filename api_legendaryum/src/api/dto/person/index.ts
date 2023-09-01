import { parseCoordinateXYZ, parseDimensionXYZ } from "@/api/util/parseXYX";
import { IPerson, IPersonCreate } from "@/core/person";
import { randomUUID } from "crypto";

export const getDtoPerson = (body: IPersonCreate): IPerson => {
  return {
    id: randomUUID(),
    namePerson: body.namePerson ? body.namePerson : "default",
    coinsId: [],
    roomId: body.roomId,
    dimensionXYZ: parseDimensionXYZ({ dimensionZ: 1, dimensionX: 1, dimensionY: 1 }),
    positionOfPersonInXYZ: parseCoordinateXYZ({ coordinateZ: 1, coordinateY: 1, coordinateX: 1 }),
  };
};
