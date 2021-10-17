import express from "express";
const router = express.Router();

import {
  addOrderItems,
  updateOrderToPaid,
  getOrderById,
  getMyOrders,
  getTotalOrders,
} from "../controllers/orderController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(protect, admin, getTotalOrders)
  .post(protect, addOrderItems);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);

export default router;
