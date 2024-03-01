const express= require('express');
const mongoose= require("mongoose");
const {dbConnect}= require("./db/db.js");
const cookieParser= require("cookie-parser");
const UserRouter= require("./routes/user.routes.js");
require("dotenv").config();

const app= express();
const PORT= process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use("/users", UserRouter);

dbConnect().then(()=>{
    console.log("DB connected succesfully");
    app.listen(PORT, ()=>{
        console.log(`Server started on port ${PORT}`);
    })
}
).catch((err)=>{
    console.log(err);
})

