const express=require('express');
const {Vozaci}=require('../models');
const router=express.Router();


router.get("/", async(req,res)=>{
    //res.send('Hi');
    const list=await Vozaci.findAll({
        order:[['PrezimeVozaca','ASC']]
    });
    res.json(list);
});

router.post("/", async(req,res)=>{
    const data=req.body;
    await Vozaci.create(data);
    res.json(data);  //potvrda
});

//koristicemo sequlize da lakse komuniciramo, moramo da kapiramo kako dobijamo podatke,ovde ce biti json, kao objekat, svaki objekat ima kao body(sve sto saljemo kao req)
router.get("/edit/:id",async(req,res)=>{
    const id=req.params.id;
    const vozaci=await Vozaci.findByPk(id); //findOne({where:{idMarke:id}})
    res.json(vozaci);
})  

router.patch("/edit/:id",async(req,res)=>{
    //console.log(req.params);
    const id=req.params.id;
    const vozaci=await Vozaci.update(req.body,{where:{IDVozaca:id}});
    res.json(vozaci);
}) 

router.delete("/delete/:id",async(req,res)=>{
    console.log(req.params)
    const id=req.params.id;
    const vozaci=await Vozaci.destroy({where:{IDVozaca:id}});
    res.json(vozaci);
})

module.exports=router;