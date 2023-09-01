import { IRoomSchema } from "@/core/room";
import CointService from "./coint";
import { EntityData } from "redis-om";
import { PersonRepository } from "@/data/redis/person/repository";
import RoomService from "./room";
import { IPerson, IPersonCreate, IPersonResponse, IPersonSearch } from "@/core/person";
import { getDtoPerson } from "../dto/person";
import { RoomRepository } from "@/data/redis/room/repository";
import { parseDimensionXYZ, parseXYZCoordinate } from "../util/parseXYX";
import { correctorCoordinate } from "../validation/person/checkLimitCoordinate";
import { ICoinSchema } from "@/core/coin";
import { CoinRepository } from "@/data/redis/coin/repository";
import { ICoordinates } from "@/core/coordinates";

export default class PersonService {
  private cointService = new CointService();
  private roomService = new RoomService();
  private roomRepo = new RoomRepository();
  private coinRepo = new CoinRepository();
  private repo = new PersonRepository();
  private async getIndex() {
    try {
      const { methods } = this.repo;
      await methods.createIndex();
    } catch (error) {
    }
  }

  async create({ namePerson, roomId }: IPersonCreate) {
    const { methods } = this.repo;
    const { methods: methodsOfRoom } = this.roomRepo;
    const { content: room } = await this.roomService.getById(roomId)
    const dtoPerson = getDtoPerson({ namePerson, roomId });
    const result = await methods.save(dtoPerson.id, dtoPerson as unknown as EntityData);
    const joinRoomAndPerson = {
      ...room,
      peopleId: [...room.peopleId, dtoPerson.id],
    };
    await methodsOfRoom.save(
      room.id,
      joinRoomAndPerson as unknown as EntityData
    );
    return {
      content: {
        room: joinRoomAndPerson,
        person: result,
      },
    };
  }

  async getAll() {
    const { methods } = this.repo;
    await this.getIndex()
    const result = await methods.search().return.all();
    return { content: result.filter((ele) => ele.id) as unknown as IPerson[] };
  }

  async getById(id: string) {
    const { methods } = this.repo;
    const response = await methods.fetch(id) as unknown as IPerson
    if (!response.roomId) return { content: null };
    const { content: room } = await this.roomService.getById(response.roomId);
    return {
      content: {
        room,
        person: response,
      },
    };
  }

  async delete(id: string) {
    const { content } = await this.getById(id);
    if (!content) throw new Error("no found");
    const { methods } = this.repo;
    const { methods: methodsToRoom } = this.roomRepo;
    await methods.remove(id);
    const filterPeople = content.room.peopleId.filter(
      (idPerson) => idPerson !== id
    );
    await methodsToRoom.save({ ...content.room, peopleId: filterPeople });
    return {
      content: `the person with the ${id} has been successfully removed`,
    };
  }

  async createAndSearch(data: IPersonCreate) {
    const { content: { person: { id } } } = await this.create(data)
    const idPerson = id as unknown as string
    return await this.searchCoin({ id: idPerson, positionOfPersonInXYZ: "X1-Y1-Z1" })
  }

  async searchCoin(data: IPersonSearch): Promise<{ content: IPersonResponse }> {
    const { content } = await this.getById(data.id)
    if (!content) throw new Error("no found search coin");
    const { room, person } = content
    const coordinateForCoin = parseXYZCoordinate(data.positionOfPersonInXYZ)
    const { positionOfPersonInXYZ: coordinateXYZ } = person
    let coordinate = coordinateForCoin ?
      coordinateForCoin : parseXYZCoordinate(coordinateXYZ) as ICoordinates
    let coinPositionsInRoom = await this.getCoordinateCoinsById(room.id)
    const { dimensionX, dimensionY, dimensionZ } = room
    const newPosition = correctorCoordinate({ dimensionX, dimensionZ, dimensionY }, coordinate)
    await this.updateCoordinate(person.id, newPosition)
    const coin = await this.cointService.searchCoordinate(newPosition)
    const updatePerson = {
      idPerson: person.id,
      coinPositionsInRoom,
      idRoom: room.id,
      namePerson: person.namePerson,
      nameRoom: room.nameRoom,
      acquiredCoins: person.coinsId,
      dimensionRoom: parseDimensionXYZ({ dimensionY, dimensionX, dimensionZ }),
      positionOfPersonInXYZ: newPosition,
      obtainingCoin: false
    }
    if (!coin || coin.roomId !== room.id)
      return { content: updatePerson };
    const updateXZY = { ...person, coordinateXYZ: updatePerson.positionOfPersonInXYZ }
    const response = await this.coinExchange(room, coin, updateXZY)
    coinPositionsInRoom = await this.getCoordinateCoins(response.roomResult as unknown as IRoomSchema)
    return {
      content: {
        ...updatePerson,
        acquiredCoins: response.personResult.coinsId as string[],
        coinPositionsInRoom,
        obtainingCoin: true
      }
    }
  }

  async updateCoordinate(id: string, coordinate: string) {
    const update = await this.repo.methods.fetch(id)
    update.coordinateXYZ = coordinate
    await this.repo.methods.save(update)
  }

  async getCoordinateCoinsById(id: string) {
    const room = await this.roomRepo.methods.fetch(id) as unknown as IRoomSchema
    if (!room.coinsId || !Array.isArray(room.coinsId)) return []
    return await this.getCoordinateCoins(room)
  }

  async getCoordinateCoins(room: IRoomSchema) {
    const promisesCoinCoordinateXYZ =
      room.coinsId.map((id) => this.cointService.personToCoin.getById(id))
    return await Promise.all(promisesCoinCoordinateXYZ)
  }

  async coinExchange(room: IRoomSchema, coin: ICoinSchema, person: IPerson) {
    const updateRoom = { ...room, coinsId: room.coinsId.filter(ids => ids !== coin.id) };
    const updatePerson = { ...person, coinsId: [...person.coinsId, coin.id] }
    const updateCoin = { ...coin, peopleId: person.id, roomId: "" }
    const roomResult = await this.roomRepo.methods.save(updateRoom as unknown as EntityData)
    const coinResult = await this.coinRepo.methods.save(updateCoin as unknown as EntityData)
    const personResult = await this.repo.methods.save(updatePerson as unknown as EntityData)
    return { roomResult, coinResult, personResult }
  }
}
