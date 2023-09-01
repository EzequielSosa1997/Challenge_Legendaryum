import { timezone } from "./timezone";
import cron from "node-cron";
import CoinAndRoomWork from "./work/coinAndRoom";

export default class CoinCron {
  private eachOneHour = "*/1 * * * *";
  private workRoomAndCoin = new CoinAndRoomWork()
  createCoin = cron.schedule(
    this.eachOneHour,
    async () => {
      await this.workRoomAndCoin.updateRoom()
      try {
      } catch (error) { }
    },
    {
      scheduled: true,
      timezone,
    }
  );
}
