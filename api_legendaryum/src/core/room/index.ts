import { ICoin, ICoinCreate } from "../coin";
import { IDimension } from "../dimension";

export interface IRoom extends IDimension {
  id: string;
  nameRoom: string;
  peopleId: string[];
  coins: ICoin[];
  expireCointDate: Date;
}

export interface IRoomSchema extends Omit<IRoom, "coins"> {
  coinsId: string[];
}

export interface IRoomCreate
  extends Pick<IRoom, "nameRoom" | "dimensionX" | "dimensionY" | "dimensionZ"> {
  coins: ICoinCreate[];
}

export interface IRoomUpdate extends Omit<IRoom, "people"> { }
