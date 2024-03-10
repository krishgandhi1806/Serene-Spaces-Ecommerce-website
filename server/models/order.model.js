const mongoose= require("mongoose");

const orderSchema= new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"] 
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
    },
    paymentStatus: {
        type: Boolean,
        default: false
    },
    razorpay_order_id:{
        type: String,
        required: [true, "RazorPay Order ID is required"],
    }
}, {
    timestamps: true
});

const Order= mongoose.model("Order", orderSchema);

module.exports= Order;