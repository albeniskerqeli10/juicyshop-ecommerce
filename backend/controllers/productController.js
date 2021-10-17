import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';


// Get all products from database 🎉
const getProducts = asyncHandler(async (req,res) => {
    const products = await Product.find({});
if(products) {
    res.json(products);
}
else {
    res.json({
        error:"Products not found"
    })
}

})

// Add any product in Database(only admin) 🎉
const addProduct = asyncHandler(async(req,res) => {
    const product = new Product({
        name:req.body.name,
        image:req.body.file,
        description:req.body.description,
         brand:req.body.brand,
          category:req.body.category,
           price:req.body.price,
            countInStock:req.body.countInStock,
             rating:req.body.rating,
              numReviews:req.body.numReviews
    })
    const newProduct = await product.save();
    if(newProduct) {
        res.json(newProduct);
    }
    else {
        res.status(404)
        throw new Error('Product not added');
    }


})

// Get custom product by id 🎉
const getProductById = asyncHandler(async(req,res)=> {
    const product = await Product.findById(req.params.id);
    if(product) {
        res.status(200).json(product)
    }
    else {
        res.status(404).json({
            error:"Product not found"
        })
    }
})


export {getProducts , getProductById , addProduct}

