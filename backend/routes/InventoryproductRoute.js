const express = require("express");
const { createProduct, getProducts, getProduct, deleteProduct, updateProduct } = require("../controllers/InventoryproductController");
const { upload } = require("../utils/fileUpload");
const router = express.Router();

router.post("/",upload.single("image"),createProduct); //add("/",protect)
router.patch("/:id",upload.single("image"),updateProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.delete("/:id", deleteProduct);




module.exports=router;