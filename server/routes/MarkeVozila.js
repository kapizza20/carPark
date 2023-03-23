const express=require('express');
const {MarkeVozila}=require('../models');
const router=express.Router();


router.get("/", async(req,res)=>{
    //res.send('Hi');
    const listOfMarke=await MarkeVozila.findAll();
    res.json(listOfMarke);
});

router.post("/", async(req,res)=>{
    const data=req.body;
    await MarkeVozila.create(data);
    res.json(data);  //potvrda
});

//koristicemo sequlize da lakse komuniciramo, moramo da kapiramo kako dobijamo podatke,ovde ce biti json, kao objekat, svaki objekat ima kao body(sve sto saljemo kao req)
router.get("/edit/:id",async(req,res)=>{
    const id=req.params.id;
    const mark=await MarkeVozila.findByPk(id); //findOne({where:{idMarke:id}})
    res.json(mark);
})  

router.patch("/edit/:id",async(req,res)=>{
    //console.log(req.params);
    const id=req.params.id;
    const mark=await MarkeVozila.update(req.body,{where:{IDMarkeVozila:id}});
    res.json(mark);
}) 

router.delete("/delete/:id",async(req,res)=>{
    console.log(req.params)
    const id=req.params.id;
    const mark=await MarkeVozila.destroy({where:{IDMarkeVozila:id}});
    res.json(mark);
})

module.exports=router;