import express from "express";
import {createTeam, getTeam, inviteUser, getTeamById} from "../controllers/teamController.js";
import {manageAuth} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", manageAuth, createTeam);
router.get("/", manageAuth, getTeam);
router.get("/:id", manageAuth, getTeamById);
router.post("/:id/invite", manageAuth, inviteUser);

export default router;