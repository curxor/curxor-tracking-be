import express from "express";
import routesAuth from "./auth.route";
import routesCategory from "./category.route";
import routesConversation from "./conversation.route";
import routesUser from "./user.route";
const router = express.Router();
router.use("/auth", routesAuth);
router.use("/category", routesCategory);
router.use("/conversation", routesConversation);
router.use("/user", routesUser);

export default router;
