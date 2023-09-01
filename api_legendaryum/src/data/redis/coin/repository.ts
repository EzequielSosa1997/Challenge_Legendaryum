import { repoRedis } from "@/config/redis";
import { Repository } from "redis-om";
import { coinSchema } from "./schema";

export class CoinRepository {
  methods = new Repository(coinSchema, repoRedis);
  redis = repoRedis;
}
