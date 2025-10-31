import express from "express";
import {
  createContest,
  getAllContest,
  getContest,
  updateContest,
  deleteContest,
} from "../controller/contest";

const router = express.Router();

router.post("/create", createContest);
router.put("/update", updateContest);
router.get("/:id", getContest);
router.get("/all", getAllContest);
router.delete("/delete/:id", deleteContest);

export default router;
