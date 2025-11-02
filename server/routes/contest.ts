import express from "express";
import {
  createContest,
  getAllContest,
  getContest,
  updateContest,
  deleteContest,
  getUserContests,
} from "../controller/contest";
import { authMiddleware } from "../middleware/auth";
import { adminMiddleware } from "../middleware/role";

const router = express.Router();

router.post("/create", authMiddleware, adminMiddleware, createContest);
router.put("/update", authMiddleware, adminMiddleware, updateContest);
router.get("/:id", authMiddleware, getContest);
router.get("/get/all", authMiddleware, adminMiddleware, getAllContest);
router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteContest);
router.get("/get/by-user", authMiddleware, getUserContests);
router.get("/get/public/all", getAllContest);

export default router;
