const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");

//get all orders  
const getAllOrders = asyncHandler(async (req, res) => {
	const processingOrders = await Order.find({OrderStatus: 'Processing'});

	if (processingOrders) {
		res.status(200).json(processingOrders);
	} else {
		res.status(400).json({
			message: "Processing orders not available",
			status: "database is empty",
		});
	}
});

//get orders by order status delivered
const getOrders = asyncHandler(async (req, res) => {
	const deliveredOrders = await Order.find({OrderStatus: 'Delivered' && 'Delivering' });

	if (deliveredOrders) {
		res.status(200).json(deliveredOrders);
	} else {
		res.status(400).json({
			message: "Processing orders not available",
			status: "database is empty",
		});
	}
});

	//update method
	const updateOrder = asyncHandler(async (req, res) => {
		const id = req.params.id;
	
		const selectedOrder = await Order.findByIdAndUpdate(id ,{ $set: req.body },{ new: true });
	
		if (selectedOrder) {
			res.status(201).json(selectedOrder);
		} else {
			res.status(404).json({ message: "Updated successfully" });
		}
	});

	// get order by id
const getSingleOrder = asyncHandler(async (req, res) => {
	const id = req.params.id;

	const selectedOrder = await Order.findById(id);

	if (selectedOrder) {
		res.status(201).json(selectedOrder);
	} else {
		res.status(404).json({ message: "Order not found" });
	}
});


module.exports = {
  getAllOrders,
	updateOrder,
	getSingleOrder,
	getOrders
};

