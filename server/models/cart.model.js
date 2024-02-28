const mongoose= require("mongoose");

const cartSchema= new mongoose.Schema(
    {
        owner:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        items:[
            {
                itemId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Item',
                    required: true
                },
                name:String,
                quantity:{
                    type:Number,
                    required: true,
                    min: 1,
                    default: 1
                },
                price:{
                    type: Number,
                    required: true
                }
            }
        ],
        bill: {
            type: Number,
            required: true,
            default: 0
        }
    
},{
    timestamps: true
});

const Cart= mongoose.model("Cart", cartSchema);

module.exports= Cart;