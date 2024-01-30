import express from "express"
import { verifyToken } from "../middleware/jwt.js";
import { getOrders, intent, confirm} from "../controller/order.controller.js"

const router = express.Router()

// router.post("/:gigId", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);

//for stripe payment, id is gigId
router.post("/create-payment-intent/:id", verifyToken, intent);
router.put("/", verifyToken, confirm);

export default router;