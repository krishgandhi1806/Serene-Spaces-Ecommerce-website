const mongoose= require("mongoose");
module.exports.dbConnect= async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    }catch(err){
        console.log(err);
    }

}
