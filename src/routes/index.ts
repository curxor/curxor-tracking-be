import express from "express";
import routesAuth from "./auth.route";
const router = express.Router();
router.use("/auth", routesAuth);
export default router;
