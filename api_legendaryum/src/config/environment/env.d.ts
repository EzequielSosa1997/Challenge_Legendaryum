declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      NODE_ENV: "development" | "production" | "local";
      PORT: number;
      DEFAULT_ROOM: string;
    }
  }
}
export { };
