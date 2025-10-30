import express from "express";
import { getAllUsers, getUser } from "../controller/user";

const router = express.Router();

router.get("/all", getAllUsers);
router.get("/:id", getUser);

export default router;
