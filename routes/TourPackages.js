const router = require("express").Router();
const Package = require("../models/TourPackage")

//library for hashing password in Node js
const bcrypt = require("bcrypt");


//Create a new tour Package
router.post("/addTourPackage", async(req,res)=>{
    const newTourPackage = new Package(req.body);
    try{
        const savedPackage = await newTourPackage.save();
        res.status(200).json(savedPackage)
    }
    catch(error)
    {
        res.status(500).json(error);
    }
})

//Update a tour package
router.put("/:id", async(req,res)=>{

    try{
       const TourPackage = await Package.findById(req.params.id);
       if(TourPackage.username === req.body.username)
       {
        try{
            const updatedTourPackage = await Package.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
            res.status(200).json(updatedTourPackage);
        }
        catch(err)
        {
         res.status(500).json(err)
        }
       }
       else
       {
        res.status(401).json("Username is invalid for this Package")
       }
       
       
    }
    catch(error)
    {
        res.status(500).json(error)
    }
})

//Delete a tour package


//Get a tour package

module.exports = router;