import Redis from "ioredis";
const redis = new Redis();
export const set = async (key: string, value: string) => {
  await redis.set(key, value);
};
export const remove = async (key: string, value: string) => {
  await redis.set(key, value);
};
