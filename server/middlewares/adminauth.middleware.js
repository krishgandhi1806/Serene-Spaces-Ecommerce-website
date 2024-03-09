const User = require("../models/user.model");
const ApiError = require("../utils/APIerror");
const { asyncHandler } = require("../utils/asyncHandler");
const jwt= require("jsonwebtoken");



module.exports.verifyAdminJWT= asyncHandler(async (req, res, next) =>{
    try {
        const token= req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    
        if(!token){
            throw new ApiError(401, "Unauthorized Request");
        }
    
        const decodedToken= jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user= await User.findById(decodedToken?._id).select("-password -refreshToken");

    
        if(!user){
            throw new ApiError(404, "Invalid Access Token");
        }
        if(user.role!=='admin'){
            throw new ApiError(404, "Unauthorized access!")
        }
        req.user =user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access Token")
    }
})