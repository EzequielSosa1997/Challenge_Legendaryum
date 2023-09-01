import { repoRedis } from "@/config/redis";
import { Repository } from "redis-om";
import { personSchema } from "./schema";

export class PersonRepository {
  methods = new Repository(personSchema, repoRedis);
  redis = repoRedis;
}
