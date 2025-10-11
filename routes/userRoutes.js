import express from "express";
import {GetUser, Updateuser} from "../controllers/userController.js";
import {manageAuth} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", manageAuth, GetUser);
router.put("/update", manageAuth, Updateuser);

export default router;