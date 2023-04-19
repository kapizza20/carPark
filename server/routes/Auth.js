const express=require('express');
const {Users}=require('../models');
const router=express.Router();

router.post("/", async(req,res)=>{
    console.log("ZAHTEV",req.body)
    const nalog= await Users.findOne( {where: {Username: req.body.Username,Pwd:req.body.Pwd}});
    res.json(nalog);  //potvrda
});


module.exports=router;