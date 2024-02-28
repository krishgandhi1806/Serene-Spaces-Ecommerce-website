const mongoose= require("mongoose");

const orderSchema= new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Owner is required"]
    },
    items:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item',
            required: true
        }
    ],
    billingAddress:{
        type: String,
        required: [true, "Billing address is required"]
    },
    paymentMethod:{
        type: String,
        enum: ["COD", "Debit Card", "Credit Card"]
    }
}, {
    timestamps: true
});

const Order= mongoose.model("Order", orderSchema);

module.exports= Order;