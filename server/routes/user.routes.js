const { createCart, deleteIteminCart, deleteSingleQuantity } = require("../controllers/cart.controller");
const { signup, login, logoutUser, refreshAccessToken, getUserDetails, changePassword, updateAccountDetails } = require("../controllers/user.controller");
const { verifyJWT } = require("../middlewares/auth.middleware");
const express= require("express");

const router= express.Router();

router.route("/signup").post(signup);

router.route("/login").post(login);

// Secured Routes
router.use(verifyJWT);

router.route("/logout").post(logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/current-user").get(getUserDetails);
router.route("/change-password").patch(changePassword);
router.route("/update").patch(updateAccountDetails);


// Adding products to cart
router.route("/cart/:itemid/:quantity").post(createCart);
router.route("/cart/:itemid").delete(deleteIteminCart);
router.route("/cart/:itemid").put(deleteSingleQuantity);
module.exports= router
