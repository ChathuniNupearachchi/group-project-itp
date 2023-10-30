const asyncHandler = require("express-async-handler");
const Product = require("../models/InventoryproductModel");
const { fileSizeFormatter } = require("../utils/fileUpload");

const createProduct = asyncHandler(async(req,res) => {
    const {name,sku,category,quantity,price,value,location,description} = req.body
    
    //Validation
    if(!name || !sku || !category || !quantity ||!price ||!value||!location||!description ){
        res.status(400)
        throw new Error("Please fill in all fields")
    }


//Handle Image  upload
let fileData = {}
if(req.file){
    fileData ={
        fileName: req.file.originalname,
        filePath: req.file.path,
        fileType: req.file.mimetype,
        fileSize: fileSizeFormatter(req.file.size,2),

    }
}

//Create Product
const product = await Product.create({
    //user:req.user.id
    name,
    sku,
    category,
    quantity,
    price,
    value,
    location,
    description,
    //image:fileData

   

});

res.status(201).json(product)

});

//Get all Products
const getProducts =asyncHandler(async(req,res) => {

    const vSearch = req.query.search
    //testing
    //console.log(vSearch)
    let products

    if(vSearch){
        products = await Product.find(
            {
                $text: { $search: vSearch }
            }
        )
    }
    else{
         products = await Product.find();
    }
    
    res.status(200).json(products);
    // const product = await Product.find().sort("-createdAt");
    // res.status(200).json(product)
});

//Get single product
const getProduct =asyncHandler(async(req,res) => {
    
    const product = await Product.findById(req.params.id);
   //if product doesn't exsit 
    if(!product){
        res.status(404)
        throw new Error("Product not found")
    }
     res.status(200).json(product)

    
});

//Delete Product
const deleteProduct =asyncHandler(async(req,res) => {
    
    const product = await Product.findById(req.params.id);
   //if product doesn't exsit
    if(!product){
        res.status(404)
        throw new Error("Product not found")
    }
    await product.deleteOne();
     res.status(200).json({message:"Product deleted"})

    
});

//Update Product
const updateProduct = asyncHandler(async(req,res) => {
    const {name,sku,category,quantity,price,value,location,description} = req.body
    const {id} = req.params;
     const product = await Product.findById(id);

     //if product doesn't exsit
    if(!product){
        res.status(404)
        throw new Error("Product not found")
    }

//Handle Image  upload
let fileData = {}
if(req.file){
    fileData ={
        fileName: req.file.originalname,
        filePath: req.file.path,
        fileType: req.file.mimetype,
        fileSize: fileSizeFormatter(req.file.size,2),

    }
}


//Update Product

const updatedProduct = await Product.findByIdAndUpdate(
    {_id:id},
    {
        name,
        category,
        quantity,
        price,
        location,
        description,
         
    },
    {
      new : true,
      runValidators:true  
    },
)

res.status(200).json(updatedProduct)
});




module.exports = {
    createProduct,getProducts,getProduct,deleteProduct,updateProduct
}
