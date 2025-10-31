import express from "express";
import {
  createPrize,
  deletePrize,
  getAllPrizes,
  getPrize,
  updatePrize,
} from "../controller/prize";

const router = express.Router();

router.post("/create", createPrize);
router.put("/update", updatePrize);
router.get("/:id", getPrize);
router.get("/get/all", getAllPrizes);
router.delete("/delete/:id", deletePrize);

export default router;
