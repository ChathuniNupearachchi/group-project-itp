const express = require("express");
const {getAllOrders, updateOrder, getSingleOrder, getOrders} = require("../controllers/dilivaryOrderController");
const router = express.Router();

router.get("/", getAllOrders);
router.put("/:id", updateOrder);
router.get("/:id", getSingleOrder);
router.get("/delivered", getOrders);

module.exports = router;