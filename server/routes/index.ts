import express from "express";

import authRoutes from "./auth";
import userRoutes from "./user";
import questionRoutes from "./question";
import contestRoutes from "./contest";

const router = express.Router();

router.get("/", (_, res) => {
  res.send("Hello World!");
});

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/question", questionRoutes);
router.use("/contest", contestRoutes);

export default router;
