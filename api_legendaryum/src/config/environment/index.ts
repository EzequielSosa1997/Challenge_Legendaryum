import "dotenv/config";

export const PORT = process.env.PORT ?? 8888;

export const DEFAULT_ROOM = process.env.DEFAULT_ROOM === "true" ? true : false
