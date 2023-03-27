'use strict';
const express=require('express');
const app=express();
const port=3003;
const Mdata=require("./data.json");
app.listen(port,()=>{
    console.log(`app listining on port ${port}`);

})
app.get('/',homePageHandler);
function homePageHandler(req, res)
{
    let result=[];
    let newMovie=new Movie(Mdata.original_title,Mdata.poster_path,Mdata.overview);
    result.push(newMovie);
    res.json(result);
    console.log("hi");
}
//constructor
function Movie(title, posterPath, overview)
{
    this.original_title=title;
    this.poster_path=posterPath;
    this.overview=overview;
}
app.get('/favorite',favHandler);
function favHandler(req,res)
{
   res.send("welcome to favorite page");
   
}


 