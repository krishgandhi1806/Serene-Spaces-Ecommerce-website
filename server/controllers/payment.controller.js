const Razorpay = require('razorpay')
const { asyncHandler } = require('../utils/asyncHandler')
const Order = require('../models/order.model')
const ApiResponse = require('../utils/APIresponse')
const ApiError = require('../utils/APIerror')
const crypto= require("crypto");
const Cart = require('../models/cart.model')


module.exports.createOrder= asyncHandler(async (req, res)=>{
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });
    const user= req.user;
    const {billingAddress}= req.body;
    if(!billingAddress){
        throw new ApiError(404, "Billing Address is required!")
    }
    const cart= await Cart.findOne({owner: user._id})
    if(!cart){
        throw new ApiError(404, "No cart found!")
    }
    // Initialize Razorpay
    // const razorpay = new Razorpay({
    //   key_id: process.env.RAZORPAY_KEY_ID,
    //   key_secret: process.env.RAZORPAY_KEY_SECRET,
    // });
  
    // Configure options for Razorpay order
    const options = {
      amount: cart.bill,
      currency: "INR",
      receipt: new Date().toISOString(),
      payment_capture: 1
    };
  
    try {
      // Create order and send details to frontend
      const response = await razorpay.orders.create(options)
      console.log(response);

      const order= await Order.create({
        user: user._id,
        items: cart.items.map((item)=> item.itemId),
        billingAddress,
        razorpay_order_id: response.id
      })

      res.status(200).json(new ApiResponse(200, {
        order_id: response.id,
        currency: response.currency,
        amount: response.amount,
        order_details: order
      }, "Order created successfully!"))
    } catch (err) {
      // Handle order creation failure
      res.status(400).send('Unable to create order. Please try again!');
    }
  });

  module.exports.verifyCapture= asyncHandler(async(req, res)=>{

    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });

    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
        // Construct the expected signature
        const sign = `${razorpay_order_id}|${razorpay_payment_id}`;
        const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
                                      .update(sign)
                                      .digest("hex");
    
        // Verify the signature
        const verified = razorpay_signature === expectedSign;
    
        if (verified) {
          // Fetch payment details from Razorpay
          const order = await razorpay.orders.fetchPayments(razorpay_order_id);
    
          // Check if the payment is captured
          if (order.items[0].status === "captured") {
            // Store payment data in the database
            // e.g., db.storePayment({ payment_id: razorpay_payment_id, order_id: razorpay_order_id, signature: razorpay_signature });
            console.log(order);
            // Redirect to success page on the frontend
            res.status(200).json({
                order
            })
            // res.redirect('/success-page');

          } else {
            res.status(400).json({ message: "Payment not captured" });
          }
        } else {
          res.status(400).json({ message: "Invalid Signature sent" });
        }
      } catch (error) {
        console.error("Error in verification", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
  })