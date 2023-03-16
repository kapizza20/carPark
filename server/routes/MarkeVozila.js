const express=require('express');
const {MarkeVozila}=require('../models');
const router=express.Router();


router.get("/", async(req,res)=>{
    //res.send('Hi');
    const listOfMarke=await MarkeVozila.findAll();
    res.json(listOfMarke);
});

//koristicemo sequlize da lakse komuniciramo, moramo da kapiramo kako dobijamo podatke,ovde ce biti json, kao objekat, svaki objekat ima kao body(sve sto saljemo kao req)

router.post("/", async(req,res)=>{
    const data=req.body;
    await MarkeVozila.create(data);
    res.json(data);  //potvrda
});

module.exports=router;