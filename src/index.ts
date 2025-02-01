require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import router from "./routes";
import errorHandler from "./middlewares/handle.error.middleware";
import MongoDBConnection from "./databases/mongodb";
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/v1", router);
app.use(errorHandler);
MongoDBConnection.getInstance();
app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
