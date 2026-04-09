import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ConnectMongoDb } from "./utils/mongodb.js";
import URLRoute from "./Routes/urls.js";
import { generateShortId } from "./utils/keys.js";
import { connectRedis } from "./utils/redis.js";

dotenv.config();

const app = express();

// Connect to Redis
connectRedis();

app.use(
  cors({
    origin: "*",
  }),
);
app.use(express.json());

console.log(generateShortId(9));
ConnectMongoDb();

app.use("/", URLRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log("I am working");
});
