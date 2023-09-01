import { ICoin } from "@/core/coin";
import { IRoom, IRoomSchema } from "@/core/room";
import { CoinRepository } from "@/data/redis/coin/repository";
import { RoomRepository } from "@/data/redis/room/repository";
import { EntityData } from "redis-om";
import { getCoinsWithCordinate } from "./helpers";
import { getDateNowAddOneHour } from "@/api/util/date";

export default class CoinAndRoomWork {
  private repoRoom = new RoomRepository();
  private repoCoin = new CoinRepository();

  async updateRoom() {
    const { methods } = this.repoRoom;
    type keyExpired = keyof Pick<IRoom, "expireCointDate">;
    const key: keyExpired = "expireCointDate";
    const now = new Date();
    const result = (await methods
      .search()
      .where(key)
      .before(now)
      .return.all()) as unknown as IRoomSchema[];
    if (!result[0]) return;
    const removeids: IRoomSchema[] = result.map((room) => ({
      ...room,
      coinsId: [],
    }));
    for (const room of removeids) {
      const coins = getCoinsWithCordinate(room);
      const ids = await this.create(coins);
      const expireCointDate = getDateNowAddOneHour();
      const roomWithIdCoin: IRoomSchema = {
        ...room,
        coinsId: ids,
        expireCointDate,
      };
      await methods.save(roomWithIdCoin as unknown as EntityData);
    }
  }

  async create(coint: ICoin[]) {
    const { methods } = this.repoCoin;
    const ttlInOneHour = 1 * 60 * 60;
    const promisesCreate = coint.map((coin) =>
      methods.save(coin.id, coin as unknown as EntityData)
    );
    const result = await Promise.all(promisesCreate);
    const idsRedis = result.map(({ id }) => id) as string[];
    await methods.expire(idsRedis, ttlInOneHour);
    const ids = result.map(({ id }) => id);
    return ids as string[];
  }
}
