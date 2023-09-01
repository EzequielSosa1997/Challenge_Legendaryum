import { IRoom } from ".";

export const minimunSizeOfRoom: Pick<
  IRoom,
  "dimensionZ" | "dimensionY" | "dimensionX"
> = {
  dimensionZ: 0,
  dimensionY: 0,
  dimensionX: 0,
};

export const maximunSizeOfRoom: Pick<
  IRoom,
  "dimensionZ" | "dimensionY" | "dimensionX"
> = {
  dimensionZ: 100,
  dimensionY: 100,
  dimensionX: 100,
};
