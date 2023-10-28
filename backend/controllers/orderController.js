const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");

//get all orders  
const getAllOrders = asyncHandler(async (req, res) => {
	const processingOrders = await Order.find({OrderStatus: 'Pending'});

	if (processingOrders) {
		res.status(200).json(processingOrders);
	} else {
		res.status(400).json({
			message: "Processing orders not available",
			status: "database is empty",
		});
	}
});

//get delivered orders  
const getDelivered = asyncHandler(async (req, res) => {
	const deliveredOrders = await Order.find({OrderStatus: 'Delivered'});

	if (deliveredOrders) {
		res.status(200).json(deliveredOrders);
	} else {
		res.status(400).json({
			message: "Processing orders not available",
			status: "database is empty",
		});
	}
});

//get orders by order status delivered
const fetchOrders = asyncHandler(async (req, res) => {
  const deliveredOrders = await Order.find({ OrderStatus: { $in: ['Processing', 'Delivering'] } });

  if (deliveredOrders.length > 0) {
    res.status(200).json(deliveredOrders);
  } else {
    res.status(400).json({
      message: "Processing or Delivering orders not available",
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

// add orders
const addOrders = asyncHandler( async (req, res) => {

  const {
		userID,
		userName,
		shippingAddress:{
			address,
			city,
			postalCode,
		},
  } = req.body;


  const newOrder = await Order.create({
    userID,
		userName,
		shippingAddress:{
			address,
			city,
			postalCode,
		},
  });

  res.status(201).json(newOrder);

  
}); 


module.exports = {
  getAllOrders,
	updateOrder,
	getSingleOrder,
	fetchOrders,
	addOrders,
	getDelivered
};

