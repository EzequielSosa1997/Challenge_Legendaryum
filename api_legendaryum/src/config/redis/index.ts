import { createClient } from "redis";

const repoRedis = createClient({ url: "redis://redis_local:6379" });
repoRedis.on("error", (err) => console.log("Redis Client Error", err));
repoRedis.connect();
export { repoRedis };
