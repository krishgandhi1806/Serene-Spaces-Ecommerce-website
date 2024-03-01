// import {v2 as cloudinary} from "cloudinary";
// import fs from "fs";
const fs= require("fs");
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports.uploadOnCloudinary= async (localFilePath) => {
    try{
        if(!localFilePath) return null
        // upload the file on cloduinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // File has been uploaded successfully
        // console.log("File uploaded to cloudinary", response.url);
        fs.unlinkSync(localFilePath);
        return response;
    }catch (error){
        fs.unlinkSync(localFilePath);
        // Remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}
