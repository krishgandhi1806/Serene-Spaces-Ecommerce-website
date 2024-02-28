const mongoose= require('mongoose');


const itemSchema= new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Item name is required"]
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "owner is required"],
        ref: 'User'
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    images:[
        {
            url: String
        }
    ]
});

const Item= mongoose.model("Item", itemSchema);
module.exports= Item;