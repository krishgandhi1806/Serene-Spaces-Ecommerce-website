const Item= require("../models/item.model");
const { asyncHandler } = require("../utils/asyncHandler");
const { uploadOnCloudinary } = require("../utils/cloudinary");
const fs= require("fs");

module.exports.createItem= asyncHandler(async(req, res)=>{
    user= req.user
    const {name, description, price}= req.body;
    // console.log(req.file);

    // Getting the images of the product
    imgUrls=[];
    files= req.files.gallery;
    files.map(async (file) =>{
        imgUrls.push(await uploadOnCloudinary(file.path));
    });

    console.log(imgUrls);
    
    const files_for_deletion= fs.readdirSync('./public/temp');

    files_for_deletion.forEach(file => {
        fs.unlinkSync('./public/temp' + file);
    });
    
    


    // let coverImageLocalPath;
    // if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
    //     coverImageLocalPath= req.files.coverImage[0].path;
    // }

    // if(req.files){
    //     req.files
    // }

    // if(!avatarLocalPath){
    //     throw new ApiError(400, "Avatar File is required");
    // }

    // Upload them to cloudinary, avatar check

    // if(!req.files){
    //     throw new ApiError(400,"No files were uploaded!");
    // }


    // const files= req.files;


    

    // const avatar= await uploadOnCloudinary(avatarLocalPath);

    // const coverImage= await uploadOnCloudinary(coverImageLocalPath);

    // if(!avatar){
    //     throw new ApiError(400, "Avatar file is required");
    // }

    return res.status(200).json({message: "File captured success"})
})