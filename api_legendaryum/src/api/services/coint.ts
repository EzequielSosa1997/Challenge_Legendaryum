import { ICoin } from "@/core/coin";
import { CoinRepository } from "@/data/redis/coin/repository";
import { EntityData } from "redis-om";
import { RoomRepository } from "@/data/redis/room/repository";


export default class CointService {
  private roomRepo = new RoomRepository();
  private repo = new CoinRepository();
  private async getIndex() {
    try {
      const { methods } = this.repo;
      await methods.createIndex();
    } catch (error) {
    }
  }

  async create(coint: ICoin[]) {
    const { methods } = this.repo;
    const ttlInOneHour = 1 * 60 * 60;
    const promisesCreate = coint.map((coin) =>
      methods.save(coin.id, coin as unknown as EntityData)
    );
    const result = await Promise.all(promisesCreate);
    const idsRedis = result.map(({ id }) => id) as string[];
    await methods.expire(idsRedis, ttlInOneHour);
    const ids = result.map(({ id }) => id);
    return { content: ids };
  }

  async getAll() {
    const { methods } = this.repo;
    await this.getIndex();
    const result = await methods.search().return.all();
    return { content: result.filter((ele) => ele.id) as unknown as ICoin[] };
  }

  async getById(id: string) {
    const { methods } = this.repo;
    const response = await methods.fetch(id);
    if (!response.id) throw new Error("no found");
    return { content: response as unknown as ICoin };
  }

  async delete(id: string) {
    await this.getById(id)
    const { methods } = this.repo;
    await this.room.unlinkCoin(id);
    await methods.remove(id);
    return {
      content: `the coint with the ${id} has been successfully removed`,
    };
  }

  async searchCoordinate(XYZ: string) {
    const { methods } = this.repo
    await this.getIndex()
    type keySearch = keyof Pick<ICoin, "coordinateXYZ">
    const key: keySearch = "coordinateXYZ"
    const [response] = await methods
      .search()
      .where(key)
      .equals(XYZ)
      .return.all() as unknown as ICoin[];
    return response ? response : null
  }

  personToCoin = {
    getById: async (id: string) => {
      const { methods } = this.repo;
      const response = await methods.fetch(id) as unknown as ICoin;
      return response.coordinateXYZ
    }
  }

  room = {
    unlinkCoin: async (idCoint: string) => {
      const { methods } = this.roomRepo;
      await this.getIndex()
      const [result] = await methods
        .search()
        .where("coinsId")
        .contain(idCoint)
        .return.all();
      const toFilter = result.coinsId as string[];
      const coinsId = toFilter.filter((id: string) => id !== idCoint);
      await methods.save({ ...result, coinsId });
    },
  };
}
