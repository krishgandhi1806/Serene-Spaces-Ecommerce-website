const mongoose= require('mongoose');
const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken");

const userSchema= new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
    },
    phone: {
        type: Number,
        required: [true, "Phone is required"],
        minLength: [10, "Phone number should not be less than 10 digits"]
    },
    email: {
        type:String ,
        required: [true, "Email is required"],
        unique: true,
    },
    password:{
        type: String,
        required: [true, "Password is required"],
        minLength: 8
    },
    address:{
        type: String,
    },
    role:{
        type: String,
        enum:['user', 'admin', 'seller'],
        default: 'user'
    },
    refreshToken:{
        type: String
    }
}, 
{timestamps: true});

userSchema.pre('save', async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password= await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect= async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken= function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.name
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken= function(){
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

const User= mongoose.model("User", userSchema);

module.exports = User;