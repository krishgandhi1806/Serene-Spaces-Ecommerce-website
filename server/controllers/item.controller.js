const Item= require("../models/item.model");
const ApiError = require("../utils/APIerror");
const { asyncHandler } = require("../utils/asyncHandler");
const { uploadOnCloudinary } = require("../utils/cloudinary");
const fs= require("fs");

module.exports.createItem= asyncHandler(async(req, res)=>{
    user= req.user
    const {name, description, price}= req.body;

    if(!name || !description || !price){
        throw new ApiError(400, "All fields are required");
    }
    // Getting the images of the product
    imgUrls=[];
    files= req.files.gallery;
    console.log(files);
    for(let i=0; i<files.length; i++){
        imgUrls[i]= await uploadOnCloudinary(files[i].path);
    }

    const newItem= await Item.create({
        name,
        owner: user._id,
        description,
        price: parseInt(price),
        images: imgUrls
    })

    if(!newItem){
        throw new ApiError(500, "Error creating item!")
    }
    return res.status(200).json({message: "File captured success", newItem});
})

module.exports.deleteItem= asyncHandler(async(req, res)=>{
    user= req.user;
    // itemid= req.params.id;
    await Item.deleteOne({_id: req.params.id});
    return res.status(200).json({
        message: "Item deleted Successfully!"
    })
})

module.exports.getAllItems= asyncHandler(async(req,res)=>{
    items= await Item.find();

    return res.status(200).json({
        message: "Items fetched successfully!",
        items
    })
})

module.exports.getSingleItem= asyncHandler(async(req, res)=>{
    const item= await Item.findById(req.params.id);
    if(!item){
        throw new ApiError(404, "No such Item Found!");
    }
    return res.status(200).json(200, {
        message: "Item Fetched Successfully",
        item
    })
})