import express from "express";
import { getAllUsers, getUser, updateUserRole } from "../controller/user";
import { adminMiddleware } from "../middleware/role";
import { authMiddleware } from "../middleware/auth";

const router = express.Router();

router.get("/get/all", authMiddleware, adminMiddleware, getAllUsers);
router.get("/:id", authMiddleware, adminMiddleware, getUser);
router.put("/update-role", authMiddleware, adminMiddleware, updateUserRole);

export default router;
