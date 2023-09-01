import { IRoomCreate } from "@/core/room";
import { isNotProperties } from "../../helpers/checkProperties";
import { createRoomTemplate, createRoomkeys } from "../template";
import { isNotType } from "../../helpers/checkTypes";
import { errorValidation } from "@/api/util/errorValidation";
import { isNotCoinsInRoom } from "../checkCoins";
import { isNotDimension } from "../checkDimension";

const errorInRoomCreate = (message: string) =>
  errorValidation({ message, origin: "function isNotRoomCreate" });

const isNotName = (name: string) => !Boolean(name) || name.length > 30;

export const isNotRoomCreate = (body: IRoomCreate) => {
  if (isNotProperties(body, createRoomkeys))
    errorInRoomCreate("the object does not meet the properties");
  if (isNotType(body, createRoomTemplate))
    errorInRoomCreate("the object does not meet the type");
  if (isNotName(body.nameRoom))
    errorInRoomCreate("the properties name is not correct");
  isNotCoinsInRoom(body);
  isNotDimension(body);
};
