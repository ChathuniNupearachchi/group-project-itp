const asyncHandler = require('express-async-handler');

const Service = require('../models/serviceModel')


// @desc    Fetch all records
// @route   GET /api/services
// @access  Private/Admin
const getServices = asyncHandler(async (req, res) => {
    const qSearch=req.query.search
    //testing
    //console.log(qSearch)
    let services

    if(qSearch){
        services = await Service.find(
            {
                $text: {$search: qSearch}
            }
        )
    }
    else{
        services = await Service.find();
    }
    
    res.status(200).json(services);

})
  
// @desc    Fetch logged in user record
// @route   GET /api/records/:id
// @access  Private/Admin
const getServiceById = asyncHandler(async (req, res) => {
    const service = await Service.findById(req.params.id)
  
    if (service) {
        res.status(200).json(service)
    } else {
        res.status(404)
        throw new Error('Service not found')
    }
})
  
// @desc    Create record
// @route   POST /api/records
// @access  Private
const addService = asyncHandler(async (req, res) => {
    
    const {productID,cusID,cusEmail,qty,serviceImage,cType,description} = req.body;

    const services = new Service({
        productID: req.body.productID,
        cusID: req.body.cusID,
        cusEmail:req.body.cusEmail,
        qty: req.body.qty,
        //serviceImage: req.body.serviceImage,
        cType: req.body.cType,
        description: req.body.description,
    })

    const savedService = await services.save();

    res.status(200).json(savedService); 
})
  
// @desc    Update record
// @route   PUT /api/records/:id
// @access  Private
const updateService = asyncHandler(async (req, res) => {

    const services = await Service.findById(req.params.id)
  
    if (services) {
  
        const updatedService = await Service.findByIdAndUpdate(req.params.id, { $set: req.body },{ 
            new: true,
        });
       
        res.status(200).json(updatedService)

    } else {
        res.status(404)
        throw new Error('Service not found')
    }
  })

// @desc    Delete record
// @route   DELETE /api/records/:id
// @access  Private
const deleteService = asyncHandler(async (req, res) => {
    const services = await Service.findById(req.params.id)
  
    if (services) {
        await services.deleteOne();
        res.status(200).json({message: 'Service removed'})
    } else {
        res.status(404)
        throw new Error('Service not found')
    }
})



//get All users PAXAN
const getAllService = asyncHandler(async(req, res) =>{
    const service = await Service.find()
    res.status(200).json(service)
})

//module.exports = {getServices, getServiceById, addService, updateService, deleteService, getAllService}

//get all count of complaints

//const Service = require('../models/serviceModel');

// @desc    Fetch the count of all records
// @route   GET /api/services/count
// @access  Private/Admin (adjust access level as needed)
const getallComplaints = async (req, res) => {
  try {
    const count = await Service.countDocuments({});
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching record count' });
  }
};


// @desc    Get the count of all returns
// @route   GET /api/services/countReturns
// @access  Private/Admin (adjust access level as needed)
const getReturnsCount = async (req, res) => {
  try {
    const count = await Service.countDocuments({ cType: 'Return' });
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching return count' });
  }
};

const getRecentComplaints = asyncHandler(async (req, res) => {
    const recentComplaints = await Service.find()
      .sort({ createdAt: -1 }) // Sort by the "createdAt" field in descending order (recent to oldest)
      .limit(5); // Limit the results to the top 5 records
  
    res.status(200).json(recentComplaints);
  });
  

module.exports = {
  getServices,
  getServiceById,
  addService,
  updateService,
  deleteService,
  getAllService,
  getallComplaints,
  getReturnsCount,
  getRecentComplaints, // Add the new function here
};
