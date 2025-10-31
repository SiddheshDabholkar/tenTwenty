import express from "express";
import mongoose from "mongoose";
import { FRONTEND_URL, MONGO_URI, PORT } from "./constant/envs";
import cors from "cors";
import routes from "./routes";
import { errorMiddleware } from "./middleware/error";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: FRONTEND_URL?.split(",") ?? [],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(errorMiddleware);

app.use("/api", routes);

mongoose
  .connect(MONGO_URI!)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log("Listening on port", PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
