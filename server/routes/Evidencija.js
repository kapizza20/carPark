const express=require('express');
const {Evidencija}=require('../models');
const router=express.Router();


router.get("/", async(req,res)=>{
    //res.send('Hi');
    const list=await Evidencija.findAll({
        order:[['DatumIzlaska','DESC']]
    });
    res.json(list);
});

router.post("/", async(req,res)=>{
    const data=req.body;
    await Evidencija.create(data);
    res.json(data);  //potvrda
});

//koristicemo sequlize da lakse komuniciramo, moramo da kapiramo kako dobijamo podatke,ovde ce biti json, kao objekat, svaki objekat ima kao body(sve sto saljemo kao req)
router.get("/edit/:id",async(req,res)=>{
    const id=req.params.id;
    const podatak=await Evidencija.findByPk(id); //findOne({where:{idMarke:id}})
    res.json(podatak);
})  

router.patch("/edit/:id",async(req,res)=>{
    //console.log(req.params);
    const id=req.params.id;
    const podatak=await Evidencija.update(req.body,{where:{IDEvidencije:id}});
    res.json(podatak);
}) 

router.delete("/delete/:id",async(req,res)=>{
    console.log(req.params)
    const id=req.params.id;
    const podatak=await Evidencija.destroy({where:{IDEvidencije:id}});
    res.json(podatak);
})

module.exports=router;