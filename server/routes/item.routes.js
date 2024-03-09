const express= require("express");
const { createItem, deleteItem, getAllItems, getSingleItem } = require("../controllers/item.controller");
const {upload}= require("../middlewares/multer.middleware");
const { verifyAdminJWT } = require("../middlewares/adminauth.middleware");
const { verifyJWT } = require("../middlewares/auth.middleware");


const router= express.Router();

router.route("/item").get(verifyJWT, getAllItems);
router.route("/item/:id").get(verifyJWT, getSingleItem);

router.use(verifyAdminJWT);

router.route("/item").post( upload.fields([
    {
        name: "gallery",
        maxCount: 5
    }
]), createItem);

router.route("/item/:id").delete(deleteItem);

module.exports= router;