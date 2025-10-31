import express from "express";

import authRoutes from "./auth";
import userRoutes from "./user";
import questionRoutes from "./question";
import contestRoutes from "./contest";
import prizeRoutes from "./prize";

import { adminMiddleware } from "../middleware/role";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

router.get("/", (_, res) => {
  res.send("Hello World!");
});

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/question", authMiddleware, adminMiddleware, questionRoutes);
router.use("/prize", authMiddleware, adminMiddleware, prizeRoutes);
router.use("/contest", contestRoutes);

export default router;
