import express from "express";
import {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestion,
  getAllQuestion,
} from "../controller/question";

const router = express.Router();

router.post("/create", createQuestion);
router.put("/update", updateQuestion);
router.get("/:id", getQuestion);
router.get("/get/all", getAllQuestion);
router.delete("/delete/:id", deleteQuestion);

export default router;
