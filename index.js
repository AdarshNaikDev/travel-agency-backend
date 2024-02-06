const express = require('express')
const app = express();
const authRoute = require("./routes/Auth")
const tourPackageRoute = require("./routes/TourPackages")

const dotenv = require("dotenv")
const mongoose = require("mongoose")

dotenv.config()

mongoose.connect(process.env.MONGO_URL,{
    
  
    
})
.then(console.log("Connected to Mongo DB"))
.catch(err=>console.log(err))

// app.use("/", (req,res)=>{
//     console.log("Hey this is main URL")
// })

app.use(express.json());

app.use("/api/auth/", authRoute);
app.use("/api/TourPackage", tourPackageRoute);

app.listen("5000", ()=>{
    console.log("Backend is running!")
})