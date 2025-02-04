export const configRedis = {
  port: parseInt(process.env.REDIS_PORT || "3000"),
  host: process.env.REDIS_HOST,
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  db: 0,
};
