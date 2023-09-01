import { ICoordinates } from "@/core/coordinates";
import { IDimension } from "@/core/dimension";
import { parseCoordinateXYZ } from "@/api/util/parseXYX";

export const correctorCoordinate = (
  { dimensionX, dimensionY, dimensionZ }: IDimension,
  { coordinateX, coordinateZ, coordinateY }: ICoordinates
) => {
  const y = coordinateY <= 0 ? 1 : coordinateY > dimensionY ? dimensionY : coordinateY;
  const x = coordinateX <= 0 ? 1 : coordinateX > dimensionX ? dimensionX : coordinateX;
  const z = coordinateZ <= 0 ? 1 : coordinateZ > dimensionZ ? dimensionZ : coordinateZ;
  return parseCoordinateXYZ({ coordinateY: y, coordinateX: x, coordinateZ: z });
};
