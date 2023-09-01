interface IObjectMove {
  positionOfPersonInXYZ: string;
  dimensionXYZ: string;
}

export interface IPerson extends IObjectMove {
  id: string;
  namePerson: string;
  coinsId: string[];
  roomId: string;
}

export interface IPersonSchema extends IPerson { }

export interface IPersonSearch
  extends Pick<IPerson, "id" | "positionOfPersonInXYZ"> { }

export interface IPersonCreate extends Pick<IPerson, "namePerson" | "roomId"> { }

export interface IPersonResponse {
  idPerson: string
  coinPositionsInRoom: string[]
  idRoom: string
  namePerson: string
  nameRoom: string
  acquiredCoins: string[]
  dimensionRoom: string
  positionOfPersonInXYZ: string
  obtainingCoin: boolean
}

export interface IIFormationOfPerson extends
  Pick<IPersonResponse, "namePerson" | "idPerson" | "obtainingCoin" | "positionOfPersonInXYZ" | "acquiredCoins"> {
}

export interface IShareDataPeople extends Pick<IPersonResponse, "idRoom" | "nameRoom" | "dimensionRoom" | "coinPositionsInRoom"> {
}

export interface IPersonAndRoomResponse {
  person: IIFormationOfPerson;
  room: IShareDataPeople;
}

