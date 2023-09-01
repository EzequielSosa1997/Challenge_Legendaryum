import { errorValidation } from "@/api/util/errorValidation";
import { IDimension } from "@/core/dimension";
import {
  maximunSizeOfRoom,
  minimunSizeOfRoom,
} from "@/core/room/minimumMeasures";
import { IRoomCreate } from "@/core/room";
import { isNotMedition } from "../helpers/checkMedition";

const errorInDimension = (message: string) =>
  errorValidation({ message, origin: "function isNotDimension" });

export const isNotDimension = ({
  dimensionX,
  dimensionY,
  dimensionZ,
}: IRoomCreate) => {
  const dimension = { dimensionY, dimensionX, dimensionZ };
  const getParams = (key: keyof IDimension) => ({
    min: minimunSizeOfRoom[key],
    observed: dimension[key],
    max: maximunSizeOfRoom[key],
  });
  if (isNotMedition(getParams("dimensionX")))
    errorInDimension(
      "the dimension x does not meet the minimum and maximum parameters of a room"
    );
  if (isNotMedition(getParams("dimensionY")))
    errorInDimension(
      "the dimension y does not meet the minimum and maximum parameters of a room"
    );
  if (isNotMedition(getParams("dimensionZ")))
    errorInDimension(
      "the dimension z does not meet the minimum and maximum parameters of a room"
    );
};
