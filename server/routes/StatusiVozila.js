const express=require('express');
const {StatusVozila}=require('../models');
const router=express.Router();


router.get("/", async(req,res)=>{
    //res.send('Hi');
    const listOfStatusi=await StatusVozila.findAll({
        order:[['NazivStatusa','ASC']]
    });
    res.json(listOfStatusi);
});

router.post("/", async(req,res)=>{
    const data=req.body;
    await StatusVozila.create(data);
    res.json(data);  //potvrda
});

//koristicemo sequlize da lakse komuniciramo, moramo da kapiramo kako dobijamo podatke,ovde ce biti json, kao objekat, svaki objekat ima kao body(sve sto saljemo kao req)
router.get("/edit/:id",async(req,res)=>{
    const id=req.params.id;
    const status=await StatusVozila.findByPk(id); //findOne({where:{idstatuse:id}})
    res.json(status);
})  

router.patch("/edit/:id",async(req,res)=>{
    //console.log(req.params);
    const id=req.params.id;
    const status=await StatusVozila.update(req.body,{where:{IDStatusa:id}});
    res.json(status);
}) 

router.delete("/delete/:id",async(req,res)=>{
    console.log(req.params)
    const id=req.params.id;
    const status=await StatusVozila.destroy({where:{IDStatusa:id}});
    res.json(status);
})

module.exports=router;