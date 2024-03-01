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

module.exports= router
