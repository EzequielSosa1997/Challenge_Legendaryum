import { repoRedis } from "@/config/redis";
import { Repository } from "redis-om";
import { roomSchema } from "./schema";

export class RoomRepository {
  methods = new Repository(roomSchema, repoRedis);
  redis = repoRedis;
}
