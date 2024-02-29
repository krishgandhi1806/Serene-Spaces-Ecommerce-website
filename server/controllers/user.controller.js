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
        const accessToken= user.generateAccessToken();
        const refreshToken= user.generateRefreshToken();

        user.refreshToken= refreshToken;
        await user.save({ validateBeforeSave: false });

        return {accessToken, refreshToken};

    }catch(error){
        throw new ApiError(500, "Something went wrong while generating access and refresh tokens")
    }
}


module.exports.signup= asyncHandler(async (req, res) =>{
    // Get user details from frontend

    const {name, phone, email, password, address} =req.body

    if(
        [name, phone, email, password].some((field) => field?.trim()==="")
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