import { errorValidation } from "@/api/util/errorValidation";
import { IRoomCreate } from "@/core/room";
import { isNotProperties } from "../helpers/checkProperties";
import { coinTemplate, coinsKeys } from "./template";
import { isNotType } from "../helpers/checkTypes";
import { checkRepeatContentArray } from "../helpers/checkDataEqualArray";
import { ICoordinates } from "@/core/coordinates";

const errorInCoint = (message: string) =>
  errorValidation({ message, origin: "function isNotCoinsInRoom" });

const messageErrorLimit = (length: number, key: keyof ICoordinates) =>
  "the object with the position of the array [" +
  length +
  "] with the orientation " +
  `${key} does not comply with the dimensions of the room`;

export const isNotCoinsInRoom = (body: IRoomCreate) => {
  const {
    coins,
    dimensionY: limitY,
    dimensionX: limitX,
    dimensionZ: limitZ,
  } = body;
  if (!Array.isArray(coins)) errorInCoint("the coins property is not an array");
  if (coins.length < 5 || coins.length > 10)
    errorInCoint("the number of coins must be between 5 and 10");
  for (let i = 0; i < coins.length; i++) {
    if (isNotProperties(coins[i], coinsKeys))
      errorInCoint(`the object in position ${i} does not meet the properties`);
    if (isNotType(coins[i], coinTemplate))
      errorInCoint(`the object in position ${i} does not meet the type`);
    const { coordinateX: x, coordinateY: y, coordinateZ: z } = coins[i];
    if (x <= 0 || x > limitX) errorInCoint(messageErrorLimit(i, "coordinateX"));
    if (y <= 0 || y > limitY) errorInCoint(messageErrorLimit(i, "coordinateY"));
    if (z <= 0 || z > limitZ) errorInCoint(messageErrorLimit(i, "coordinateZ"));
  }
  const convertString = coins.map(
    ({ coordinateX: x, coordinateY: y, coordinateZ: z }) => `${x}${y}${z}`
  );
  if (checkRepeatContentArray(convertString))
    errorInCoint(`the are positions that are repeated`);
};
