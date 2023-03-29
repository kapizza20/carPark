const express=require('express');
const {Vozila}=require('../models');
const router=express.Router();

router.get("/", async(req,res)=>{
    //res.send('Hi');
    const list=await Vozila.findAll({
        order:[['OznakaTablica','ASC']]
    });
    res.json(list);
});

router.post("/", async(req,res)=>{
    const data=req.body;
    await Vozila.create(data);
    res.json(data);  //potvrda
});

router.get("/edit/:id",async(req,res)=>{
    const id=req.params.id;
    const vozilo=await Vozila.findByPk(id);
    res.json(vozilo);
})  

router.patch("/edit/:id",async(req,res)=>{
    //console.log(req.params);
    const id=req.params.id;
    const vozilo=await Vozila.update(req.body,{where:{IDVozila:id}});
    res.json(vozilo);
}) 

router.delete("/delete/:id",async(req,res)=>{
    console.log(req.params)
    const id=req.params.id;
    const vozilo=await Vozila.destroy({where:{IDVozila:id}});
    res.json(vozilo);
})

module.exports=router;