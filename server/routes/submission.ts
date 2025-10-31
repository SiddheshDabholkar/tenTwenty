import express from "express";
import {
  triggerSubmission,
  updateSubmission,
  deleteSubmission,
  getSubmission,
  getAllSubmission,
} from "../controller/submission";

const router = express.Router();

router.post("/trigger", triggerSubmission);
router.put("/update", updateSubmission);
router.get("/:id", getSubmission);
router.get("/all", getAllSubmission);
router.delete("/delete/:id", deleteSubmission);

export default router;
