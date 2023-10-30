const express = require('express');
const router = express.Router();

const {getServices, getServiceById, addService, updateService, deleteService,getAllService, getallComplaints, getRecentComplaints} = require('../controllers/serviceController')


router.get('/getServices', getServices)
router.get('/getDetails/:id', getServiceById)

router.post('/addService',addService)
router.delete('/:id',deleteService)
router.put('/:id',updateService)
router.get("/getallService",getAllService)

router.get("/getallComplaints",getallComplaints)
router.get("/getReturnsCount",getallComplaints)

router.get("/getRecentComplaints",getRecentComplaints)
module.exports = router;
