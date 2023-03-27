const express=require('express');
const {TipoviVozila}=require('../models');
const router=express.Router();

router.get("/", async(req,res)=>{
    //res.send('Hi');
    const listOfTipovi=await TipoviVozila.findAll({
        order:[['NazivTipa','ASC']]
    });
    res.json(listOfTipovi);
});

router.post("/", async(req,res)=>{
    const data=req.body;
    await TipoviVozila.create(data);
    res.json(data);  //potvrda
});

router.get("/edit/:id",async(req,res)=>{
    const id=req.params.id;
    const mark=await TipoviVozila.findByPk(id); //findOne({where:{idMarke:id}})
    res.json(mark);
})  

router.patch("/edit/:id",async(req,res)=>{
    //console.log(req.params);
    const id=req.params.id;
    const mark=await TipoviVozila.update(req.body,{where:{IDTipa:id}});
    res.json(mark);
}) 

router.delete("/delete/:id",async(req,res)=>{
    console.log(req.params)
    const id=req.params.id;
    const mark=await TipoviVozila.destroy({where:{IDTipa:id}});
    res.json(mark);
})

module.exports=router;