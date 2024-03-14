const {asyncHandler}= require("../utils/asyncHandler")
const User= require("../models/user.model");
const jwt= require("jsonwebtoken");
const {decode}= require("jsonwebtoken")
const {uploadOnCloudinary}= require("../utils/cloudinary");
const ApiError= require("../utils/APIerror");
const ApiResponse= require("../utils/APIresponse");

// Cookie Options
const options= {
    httpOnly: true,
    secure: true
}


// Generating access and refresh tokens

const generateAccessAndRefreshTokens= async(userId) =>{
    try{
        const user= await User.findById(userId);
        const accessToken= await user.generateAccessToken();
        const refreshToken= await user.generateRefreshToken();

        user.refreshToken= refreshToken;
        await user.save({ validateBeforeSave: false });

        return {accessToken, refreshToken};

    }catch(error){
        throw new ApiError(500, "Something went wrong while generating access and refresh tokens")
    }
}


module.exports.signup= asyncHandler(async (req, res) =>{
    // Get user details from frontend

    const {name, phone, email, password} =req.body
    let address= req.body.address;
    

    if(
        [name, phone, email, password].some((field) => field==="")
    ){
        throw new ApiError(400, "All fields are Compulsory")
    }
    

    // Check if user already exists: email

    const existedUser= await User.findOne({email})

    if(existedUser){
        throw new ApiError(409, "User with this email or username already exists")
    }

    // Create a user object- create entry in db
    const user= await User.create({
        name,
        phone,
        email,
        password,
        address: address?address:""
    })

    // Remove password and refresh token field from response
    
    const createdUser= await User.findById(user._id).select("-password -refreshToken")

    // Check for user creation

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    // Return response
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered SUccesfully")
    )

})

module.exports.login= asyncHandler(async (req, res)=>{
    // req body ->data
    //  username or email

    const {email, password}= req.body;
    // console.log(username, email);
    if(!email || !password){
        throw new ApiError(400, "Email and password is required");
    }

    // find the user
    const user= await User.findOne({email})

    if(!user){
        throw new ApiError(404, "User does not exist")
    }
    // password check

    const isPasswordValid= await user.isPasswordCorrect(password);

    if(!isPasswordValid){
        throw new ApiError(404, "Invalid User credentials")
    }
    // access and refresh token
    const {accessToken, refreshToken}=
    await generateAccessAndRefreshTokens(user._id);

    const loggedInUser= await User.findById(user._id).select("-password -refreshToken");

    // send cookie

    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User Logged in Successfully"
        )
    )
})

module.exports.changePassword= asyncHandler(async(req, res)=>{
    const {oldPassword, newPassword}= req.body;
    const user= await User.findById(req.user?._id);

    const isPasswordCorrect= await user.isPasswordCorrect(oldPassword);

    if(!isPasswordCorrect){
        throw new ApiError(400, "Invalid Old Password");
    }

    user.password= newPassword;

    await user.save({validateBeforeSave: false});

    return res.status(200)
    .json(new ApiResponse(200, {}, "Password Changed Successfully"))
})

module.exports.refreshAccessToken= asyncHandler(async (req, res)=>{
    const incomingRefreshToken= req.cookies.refreshToken || req.body.refreshToken
    console.log(incomingRefreshToken);
    if(!incomingRefreshToken){
        throw new ApiError(401, "Unauthorized request");
    }

    try {
        const decodedToken= jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        
        const user= await User.findById(decodedToken._id);
        // console.log(user._id);
        if(!user){
            throw new ApiError(401, "Invalid Refresh Token");
        }
    
        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401, "Refresh Token is expired or used")
        }

        const {accessToken, newRefreshToken}= await generateAccessAndRefreshTokens(user._id);
    
        res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200,
                {accessToken, refreshToken: newRefreshToken},
                "Access Token Refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Refresh Token")
    }
    
})

module.exports.logoutUser= asyncHandler(async (req, res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out successfully"))
    
})

module.exports.getUserDetails= asyncHandler(async (req, res)=>{
    const user= req.user;
    if(!user){
        throw new ApiError(400,"Unauthorized Request");
    }
    const newUser= await User.findById(user._id).select("-password -refreshToken");

    if(!newUser){
        throw new ApiError(404,"User Not found");
    }

    return res.status(200).json(
        new ApiResponse(200, {newUser}, "User Details Retrieved Successfully")
    )
})

module.exports.updateAccountDetails= asyncHandler(async(req, res) => {
    const {name, email, phone, address}= req.body;

    if(!name || !email || !phone){
        throw new ApiError(400, "All Fields are required");
    }

    const user= await User.findByIdAndUpdate(req.user?._id,
        {
            $set: {
                name: name,
                email: email,
                address: address?address : "",
                phone: phone
            }
        },
        {new: true}).select("-password -refreshToken");

        return res.status(200)
        .json(new ApiResponse(200, user, "Account Details updated Successfully"));
})