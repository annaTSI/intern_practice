const express=require("express");
const path=require("path");
const app=express();
const bodyparser =require('body-parser')
const adminRoutes=require('../routes/admin');
const shopRoutes=require('../routes/shop');
// app.use(express.static(path.join(__dirname,'public')))

app.use("/admin",adminRoutes);
app.use(shopRoutes);
app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(__dirname,"views","404page.html"));
})

app.use(bodyparser.urlencoded())


app.listen(3000); 
 
