const express=require('express');
const {Cinovi}=require('../models');
const router=express.Router();


router.get("/", async(req,res)=>{
    //res.send('Hi');
    const list=await Cinovi.findAll({
        order:[['NazivCina','ASC']]
    });
    res.json(list);
});

router.post("/", async(req,res)=>{
    const data=req.body;
    await Cinovi.create(data);
    res.json(data);  //potvrda
});

//koristicemo sequlize da lakse komuniciramo, moramo da kapiramo kako dobijamo podatke,ovde ce biti json, kao objekat, svaki objekat ima kao body(sve sto saljemo kao req)
router.get("/edit/:id",async(req,res)=>{
    const id=req.params.id;
    const cin=await Cinovi.findByPk(id); //findOne({where:{idMarke:id}})
    res.json(cin);
})  

router.patch("/edit/:id",async(req,res)=>{
    //console.log(req.params);
    const id=req.params.id;
    const cin=await Cinovi.update(req.body,{where:{IDCina:id}});
    res.json(cin);
}) 

router.delete("/delete/:id",async(req,res)=>{
    console.log(req.params)
    const id=req.params.id;
    const cin=await Cinovi.destroy({where:{IDCina:id}});
    res.json(cin);
})

module.exports=router;