require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import router from "./routes";
import errorHandler from "./middlewares/handle.error.middleware";
import MongoDBConnection from "./databases/mongodb";
import RedisConnection from "./databases/redis";
import cors from "cors";
const app = express();
const port = process.env.PORT || 3000;
app.use(
  cors({
    origin: ["https://curxor-tracking.netlify.app", "http://localhost:8081"],
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/v1", router);
app.use(errorHandler);
MongoDBConnection.getInstance();
RedisConnection.getInstance();

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
