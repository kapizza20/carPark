const express=require('express');
const {Users}=require('../models');
const router=express.Router();

router.post("/", async(req,res)=>{
    const data=req.body;
    await Users.create(data);
    res.json(data);  //potvrda
});


module.exports=router;