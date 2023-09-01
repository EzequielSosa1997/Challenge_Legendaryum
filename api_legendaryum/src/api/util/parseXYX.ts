import { ICoordinates } from "@/core/coordinates";
import { IDimension } from "@/core/dimension";

export const parseCoordinateXYZ = (data: ICoordinates) =>
  `X${data.coordinateX}-Y${data.coordinateY}-Z${data.coordinateZ}`;

export const parseDimensionXYZ = (data: IDimension) =>
  `X${data.dimensionX}-Y${data.dimensionY}-Z${data.dimensionZ}`;

export const parseXYZCoordinate = (XYZ: string): ICoordinates | null => {
  try {
    const xNumber = XYZ.split("-")[0]
    const x = xNumber.split("X")[1]
    const yNumber = XYZ.split("-")[1]
    const y = yNumber.split("Y")[1]
    const zNumber = XYZ.split("-")[2]
    const z = zNumber.split("Z")[1]
    for (const coor of [x, y, z]) {
      if (Number.isNaN(Number(coor))) throw new Error("")
    }
    return { coordinateY: Number(y), coordinateX: Number(x), coordinateZ: Number(z) }
  } catch (error) {
    return null
  }
}
