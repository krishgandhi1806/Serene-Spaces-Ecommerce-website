const express= require("express");
const { createItem } = require("../controllers/item.controller");
const {upload}= require("../middlewares/multer.middleware");

const router= express.Router();

router.route("/createItem").post(upload.single('img'), createItem);
module.exports= router;