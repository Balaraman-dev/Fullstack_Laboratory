import express from 'express';
const app=express();
const PORT =5000;


app.get('/',(req,res)=>{
    res.send("Backend working properly....");
});


app.listen(PORT,()=>{
    console.log("Server is running on port ",PORT);
});

