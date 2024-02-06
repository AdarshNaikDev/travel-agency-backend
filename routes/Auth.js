const router = require("express").Router();
const User = require("../models/User");

//library for hashing password in Node js
const bcrypt = require("bcrypt");

//REGISTER

router.post("/registerAdmin", async(req,res)=>{
    try{

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const newUser = new User({
                userName : req.body.userName,
                email: req.body.email,
                password: hashedPassword
            });

            const user = await newUser.save();
            res.status(200).json(user);
    }
    catch(error)
    {
        res.status(500).json(error);
    }
})

//LOGIN

router.post("/login", async(req,res)=>{

    try{
       
        const user = await User.findOne({userName:req.body.userName})

        if(!user)
        {
            res.status(400).json("Invalid Credentials")
        }
        
        //if in cas{e user exists further password needs to be checked
        const validated = await bcrypt.compare(req.body.password, user.password)

        const {password, ...responseObj} = user._doc;
        if(validated)
        {
            res.status(200).json(responseObj);
        }
        else{
            res.status(400).json("Invalid username or password!")
        }
    }
    catch(error)
    {
        res.status(500).json(error)
    }
})


module.exports = router;