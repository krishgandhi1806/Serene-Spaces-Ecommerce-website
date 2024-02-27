const mongoose= require("mongoose");
module.exports.dbConnect= async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("DB connected successfully")
    }catch(err){
        console.log(err);
    }

}
