const Cart= require("../models/cart.model");
const Item = require("../models/item.model");
const ApiError = require("../utils/APIerror");
const ApiResponse = require("../utils/APIresponse");
const { asyncHandler } = require("../utils/asyncHandler");

module.exports.createCart= asyncHandler(async(req, res)=>{
    const user= req.user;
    const {itemid, quantity}= req.params;

    const cart= await Cart.findOne({owner: user._id});

    const item= await Item.findById(itemid);

    if(!item){
        throw new ApiError(404, "Item Not found!");
    }

    const price= item.price;
    const name= item.name;

    if(cart){
        const itemIndex= cart.items.findIndex((item)=>{ return item.itemId.toString()===itemid});
        // Check if product exists or not
        if(itemIndex >-1){
            let product= cart.items[itemIndex];
            product.quantity+=parseInt(quantity);
            cart.items[itemIndex]= product;
            cart.bill= cart.items.reduce((acc, curr)=>{
                return acc + curr.quantity * curr.price;
            }, 0);
            await cart.save();
            return res.status(200).json(new ApiResponse(200, {cart}, "Cart Updated successfully!"));
        }else{
            cart.items.push({itemId: itemid, quantity, name, price});

            cart.bill= cart.items.reduce((acc, curr)=>{
                return acc + curr.quantity * curr.price;
            }, 0);
            await cart.save();
            return res.status(200).json(new ApiResponse(200, {cart}, "Item Added to Cart Successfully!"));
        }
    }else{
        const newCart= await Cart.create({
            owner: user._id,
            items: [{itemId: itemid, quantity, price, name}],
            bill: item.price * quantity
        })

        if(!newCart){
            throw new ApiError(500, "Error Creating Cart!");
        }
        return res.status(200).json(new ApiResponse(200, {newCart}, "Item Added to Cart Successfully!"));
    }
})

module.exports.deleteIteminCart= asyncHandler(async(req, res)=>{
    const user= req.user;
    const {itemid}= req.params;
    let cart= await Cart.findOne({owner: user._id});
    if(!cart){
        throw new ApiError(404, "No Cart Found for the user");
    }
    if(!itemid){
        throw new ApiError(404, "No itemID found in the URL!");
    }

    const itemexists= await Item.findById(itemid);
    if(!itemexists){
        throw new ApiError(404, "No such item exists!")
    }

    const itemIndex= cart.items.findIndex((item)=>item.itemId.toString()===itemid);
    if(itemIndex>-1){
        const item= cart.items[itemIndex];
        cart.bill -= item.quantity * item.price;
        cart.items.splice(itemIndex, 1);
        cart= await cart.save();
        return res.status(200).json(new ApiResponse(200, {cart}, "Item Deleted successfully!"));
    }else{
        throw new ApiError(404, "No Item Found in the cart.")
    }

})


module.exports.deleteSingleQuantity= asyncHandler(async(req, res)=>{
    const user= req.user;
    const {itemid}= req.params;
    let cart= await Cart.findOne({owner: user._id});
    if(!cart){
        throw new ApiError(404, "No Cart Found for the user");
    }
    if(!itemid){
        throw new ApiError(404, "No itemID found in the URL!");
    }

    const itemexists= await Item.findById(itemid);
    if(!itemexists){
        throw new ApiError(404, "No such item exists!")
    }

    const itemIndex= cart.items.findIndex((item)=>item.itemId.toString()===itemid);
    if(itemIndex>-1){
        let item= cart.items[itemIndex];

        if(item.quantity===1){
            cart.bill-= item.price;
            cart.items.splice(itemIndex, 1);
            cart= await cart.save();
            return res.status(200).json(new ApiResponse(200, {cart}, "Item Deleted from Cart successfully!"));
        }

        cart.bill -= item.price;
        item.quantity -=1;
        cart.items[itemIndex]= item;
        cart= await cart.save();
        return res.status(200).json(new ApiResponse(200, {cart}, "1 Quantity deleted successfully!"));
    }else{
        throw new ApiError(404, "No Item Found in the cart.")
    }

})

