const express= require('express');
const mongoose= require("mongoose");
const {dbConnect}= require("./db/db.js");
require("dotenv").config();

const app= express();
const PORT= process.env.PORT;



dbConnect().then(
    app.listen(PORT, ()=>{
        console.log(`Server started on port ${PORT}`);
    })
).catch((err)=>{
    console.log(err);
})

