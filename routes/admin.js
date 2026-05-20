const express=require('express');
const router=express.Router();
const path =require("path")
const rootDir=require("../utlis/path")

router.get('/add-products',(req,res,next)=>{
res.sendFile(path.join(rootDir,"views","add-products.html" ));
})

router.post('/store-products',(req,res,next)=>{
    console.log("form data",req.body);
    res.send("<b>Form Submitted</b>")
    })
    module.exports=router;

    