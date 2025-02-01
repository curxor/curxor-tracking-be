import Redis from "ioredis";
import { configRedis } from "../configs/redis";

export default class RedisService {
  private static instance: Redis;

  private constructor() {}

  public static getInstance(): Redis {
    if (!RedisService.instance) {
      RedisService.instance = new Redis(configRedis);
    }
    RedisService.instance.on("connect", () => {
      console.log("Connected to Redis!");
    });

    RedisService.instance.on("error", (err) => {
      console.error("Redis connection error:", err);
    });
    return RedisService.instance;
  }

  public static async set(key: string, value: string): Promise<void> {
    await RedisService.getInstance().set(key, value);
  }

  public static async get(key: string): Promise<string | null> {
    return await RedisService.getInstance().get(key);
  }

  public static async remove(key: string): Promise<number> {
    return await RedisService.getInstance().del(key);
  }
}
