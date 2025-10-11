import express from "express";
import {login, refresh, logout, register } from "../controllers/authController.js";

const router = express.Router();

// user register 
router.post("/register", register);
// user login
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout)

export default router;