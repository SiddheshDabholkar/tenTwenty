import express from "express";

import authRoutes from "./auth";
import userRoutes from "./user";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.use("/auth", authRoutes);
router.use("/user", userRoutes);

export default router;
