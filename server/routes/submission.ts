import express from "express";
import {
  triggerSubmission,
  updateSubmission,
  deleteSubmission,
  getSubmission,
  getAllSubmission,
  getUserSubmission,
} from "../controller/submission";

const router = express.Router();

router.post("/trigger", triggerSubmission);
router.put("/update", updateSubmission);
router.get("/:id", getSubmission);
router.get("/get/all", getAllSubmission);
router.delete("/delete/:id", deleteSubmission);
router.get("/get/user", getUserSubmission);

export default router;
