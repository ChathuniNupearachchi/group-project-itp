const express = require("express");
const {getAllOrders, updateOrder, getSingleOrder, addOrders, fetchOrders, getDelivered} = require("../controllers/orderController");
const router = express.Router();

router.get("/", getAllOrders);
router.get("/OrderStatus", fetchOrders);
router.get("/delivered", getDelivered);
router.put("/:id", updateOrder);
router.get("/:id", getSingleOrder);
router.post("/", addOrders);

module.exports = router;