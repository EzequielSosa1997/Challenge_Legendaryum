import { IRoom, IRoomCreate, IRoomSchema } from "@/core/room";
import { getDtoRoomCreate } from "../dto/room";
import CointService from "./coint";
import { RoomRepository } from "@/data/redis/room/repository";
import { EntityData } from "redis-om";

export default class RoomService {
  private cointService = new CointService();
  private repo = new RoomRepository();
  private async getIndex() {
    try {
      const { methods } = this.repo;
      await methods.createIndex();
    } catch (error) { }
  }

  async findByNameToService(name: string) {
    const { methods } = this.repo;
    await this.getIndex();
    type keyName = keyof Pick<IRoom, "nameRoom">;
    const key: keyName = "nameRoom";
    const response = await methods
      .search()
      .where(key)
      .equals(name)
      .return.all();
    return { content: response[0] ? true : false };
  }

  async create(body: IRoomCreate) {
    const { methods } = this.repo;
    const isRepeatName = await this.findByNameToService(body.nameRoom);
    if (isRepeatName.content)
      throw new Error("the name of the room is already in use");
    const { coins, ...dto } = getDtoRoomCreate(body);
    const coinsId = coins.map(({ id }) => id);
    const roomSchema: IRoomSchema = {
      ...dto,
      coinsId,
    };
    const resultServiceCoin = await this.cointService.create(coins);
    const result = await methods.save(
      roomSchema.id,
      roomSchema as unknown as EntityData
    );
    return {
      content: {
        message: "the room with your coins has been created successfully",
        roomName: dto.nameRoom,
        roomId: result.id,
        coinIds: resultServiceCoin.content,
        countCoins: resultServiceCoin.content.length
      },
    };
  }

  async getAll() {
    const { methods } = this.repo;
    await this.getIndex();
    const result = await methods.search().return.all() as unknown as IRoomSchema[];
    const data = result.map((data) => ({ ...data, countCoins: data.coinsId.length }))
    return { content: data.filter((ele) => ele.id) };
  }

  async getAllOnlyId() {
    const { methods } = this.repo;
    await this.getIndex();
    const result = (await methods
      .search()
      .return.all()) as unknown as IRoomSchema[];
    return { content: result.map(({ id }) => id).filter((id) => id) };
  }
  async getById(id: string) {
    const { methods } = this.repo;
    const response = await methods.fetch(id) as unknown as IRoomSchema;
    if (!response.id) throw new Error("no found");
    const data = { ...response, countCoins: response.coinsId.length }
    return { content: data };
  }

  async delete(id: string) {
    const { content } = await this.getById(id);
    const { methods } = this.repo;
    const { coinsId } = content;
    const promisesDelete = coinsId.map((coin) =>
      this.cointService.delete(coin)
    );
    await Promise.all(promisesDelete);
    await methods.remove(id);
    return { content: `the room with the ${id} has been successfully removed` };
  }
}
