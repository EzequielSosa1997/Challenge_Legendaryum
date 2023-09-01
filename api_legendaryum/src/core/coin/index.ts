import { ICoordinates } from "../coordinates";

export interface ICoin extends IObjectMove {
  id: string;
  roomId: string | null;
  peopleId: string | null;
}

interface IObjectMove {
  coordinateXYZ: string;
  dimensionXYZ: string;
}

export interface ICoinSchema extends ICoin, IObjectMove {
  id: string;
  roomId: string | null;
  peopleId: string | null;
}

export interface ICoinCreate extends ICoordinates { }
