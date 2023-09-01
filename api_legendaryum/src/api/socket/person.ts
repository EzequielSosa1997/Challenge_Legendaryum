import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import {
  IIFormationOfPerson,
  IPersonCreate,
  IPersonResponse,
  IPersonSearch,
  IShareDataPeople,
} from "@/core/person";
import PersonService from "../services/person";

export class PersonSocket {
  private socket: Socket<DefaultEventsMap>;
  private personService = new PersonService();
  private SIGNAL_TO_CREATE_AND_SEARCH = "createAndSearch";
  private SIGNAL_TO_RECEIVING_NAME_AND_ID = "receivingNameAndId";
  private SEARCH = "search";
  constructor(data: Socket<DefaultEventsMap>) {
    this.socket = data;
  }

  private async getData(response: IPersonCreate | null) {
    if (!response?.namePerson || !response.roomId)
      throw new Error();
    if (typeof response?.namePerson !== "string" || typeof response.roomId !== "string")
      throw new Error();
    const result = await this.personService.createAndSearch(response);
    const separate = this.separatePuplicFromPrivate(result.content)
    this.socket.emit(this.SIGNAL_TO_RECEIVING_NAME_AND_ID, separate);
  }

  async createAndSearch() {
    this.socket.on(
      this.SIGNAL_TO_CREATE_AND_SEARCH,
      async (response) => {
        try {
          await this.getData(response)
        } catch (error) {
          this.socket.emit(this.SIGNAL_TO_RECEIVING_NAME_AND_ID, {
            content:
              "You need the name and the choice of the room," +
              "{id:uuid,namePerson:'example'}",
          });
        }
      })
  }

  private separatePuplicFromPrivate(data: IPersonResponse) {
    const person: IIFormationOfPerson = {
      namePerson: data.namePerson,
      positionOfPersonInXYZ: data.positionOfPersonInXYZ,
      idPerson: data.idPerson,
      obtainingCoin: data.obtainingCoin,
      acquiredCoins: data.acquiredCoins,
    };
    const room: IShareDataPeople = {
      idRoom: data.idRoom,
      nameRoom: data.nameRoom,
      dimensionRoom: data.dimensionRoom,
      coinPositionsInRoom: data.coinPositionsInRoom,
    };
    return { content: { person, room } };
  }

  private notifyThatACoinWasFound(data: IPersonResponse) {
    const {
      content: { room, person },
    } = this.separatePuplicFromPrivate(data);
    if (person.obtainingCoin) {
      this.socket.broadcast.emit(this.SEARCH, { content: { room } })
    };
    this.socket.emit(this.SEARCH, { content: { room, person } });
  }

  private async logicaSearch(response: IPersonSearch | null) {
    if (!response?.positionOfPersonInXYZ || !response?.id)
      throw new Error();
    if (typeof response?.positionOfPersonInXYZ !== "string" || typeof response?.id !== "string")
      throw new Error();
    const result = await this.personService.searchCoin(response);
    if (result.content.obtainingCoin)
      return this.notifyThatACoinWasFound(result.content);
    const separate = this.separatePuplicFromPrivate(result.content);
    return this.socket.emit(this.SEARCH, separate);
  }

  async search() {
    this.socket.on(
      this.SEARCH,
      async (response) => {
        try {
          await this.logicaSearch(response)
        } catch (error) {
          return this.socket.emit(this.SEARCH, {
            content:
              "You need the name and the choice of the room," +
              "{ id: 'uuid', positionOfPersonInXYZ:'X1-Y1-Z1' }",
          });
        }
      }
    );
  }
}
