import { IRoomCreate } from "@core/room";

export const templateRoom: IRoomCreate = {
  nameRoom: "default",
  dimensionX: 50,
  dimensionY: 50,
  dimensionZ: 50,
  coins: [
    {
      coordinateX: 1,
      coordinateZ: 10,
      coordinateY: 12,
    },
    {
      coordinateX: 21,
      coordinateZ: 31,
      coordinateY: 21,
    },
    {
      coordinateX: 31,
      coordinateZ: 13,
      coordinateY: 13,
    },
    {
      coordinateX: 38,
      coordinateZ: 19,
      coordinateY: 3,
    },
    {
      coordinateX: 26,
      coordinateZ: 11,
      coordinateY: 3,
    },
    {
      coordinateX: 43,
      coordinateZ: 23,
      coordinateY: 25,
    },
    {
      coordinateX: 26,
      coordinateZ: 36,
      coordinateY: 46,
    },
  ],
};
