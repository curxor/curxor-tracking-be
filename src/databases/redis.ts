import Redis from "ioredis";
import { configRedis } from "../configs/redis";

export default class RedisService {
  private static instance: Redis;

  private constructor() {}

  //#region connect()
  public static async connect(): Promise<void> {
    if (!RedisService.instance) {
      RedisService.instance = new Redis(configRedis);

      // Đăng ký sự kiện một lần duy nhất
      RedisService.instance.once("connect", () => {
        console.log(" Connected to Redis!");
      });

      RedisService.instance.once("error", (err) => {
        console.error(" Redis connection error:", err);
      });
    }
  }
  //#endregion
  //#region disconnect()
  public static async disconnect(): Promise<void> {
    if (RedisService.instance) {
      await RedisService.instance.quit(); // Dùng quit để đóng kết nối an toàn
      RedisService.instance = undefined as any; // Reset lại instance để có thể tạo lại khi cần
      console.log("🔌 Disconnected from Redis");
    }
  }
  //#endregion
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
