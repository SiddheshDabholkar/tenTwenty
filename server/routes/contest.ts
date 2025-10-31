import express from "express";
import {
  createContest,
  getAllContest,
  getContest,
  updateContest,
  deleteContest,
  processContestEnd,
} from "../controller/contest";
import { authMiddleware } from "../middleware/auth";
import { adminMiddleware } from "../middleware/role";

const router = express.Router();

router.post("/create", authMiddleware, adminMiddleware, createContest);
router.put("/update", authMiddleware, adminMiddleware, updateContest);
router.get("/:id", getContest);
router.get("/all", authMiddleware, adminMiddleware, getAllContest);
router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteContest);
router.post(
  "/process-end/:id",
  authMiddleware,
  adminMiddleware,
  processContestEnd
);

export default router;
