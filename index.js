`use strict`
const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const Mdata=require("./data.json")
require('dotenv').config();

const PORT = process.env.PORT;
const apikey = process.env.API_KEY;

app.use(cors());
app.get('/', homePageHandler);
app.get('/favorite',favHandler);//lab11
app.get('/trending', trendingHandler);//lab12
app.get('/search', movieNameSearch);
app.get('/TVEpisodes', EpisodesTvHandler);
app.get('/companies',companiesHandler)

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
//trending lab12
function trendingHandler(req, res) {
    let URL= `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&language=en-US&query=The&page=2`;
    axios.get(URL)
    .then((result)=>{
      // console.log(result.data.results);
      let move=result.data.results.map((element)=>{
        return new DataMovie(element.id,element.original_title,element.release_date,element.poster_path,element.overview)
      })
      res.json(move);
    })
    .catch((err)=>{
      console.log(err.message);
      res.send(err.message);
    })
}
//constructor for trendingHandler
function DataMovie(id, original_title, release_date, poster_path, overview) {
    this.id = id;
    this.original_title = original_title;
    this.release_date = release_date;
    this.poster_path = poster_path
    this.overview = overview;
}
//search 
function movieNameSearch(req,res){
    let name=req.query.name;
    let url =`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${name}&language=en-US&page=1&include_adult=false`;
    axios.get(url)
    .then((result)=>{
      let MovieResult=result.data.results.map((element)=>{
        return new MovieFilterCon(element.id,element.original_title,element.release_date,element.poster_path,element.overview)
      });
//     res.send("hi")
// console.log(result);
      res.json(MovieResult);
    })
    .catch((err)=>{
      console.log(err.message);
      res.send(err.message);
    })
  }
  
//constructor for search
function MovieFilterCon(id,title,date,path,overview){
    this.id=id;
    this.title=title;
    this.release_date=date;
    this.poster_path=path;
    this.overview=overview;
  }

//functions of new routes
function EpisodesTvHandler(req, res)
{
    let name=req.query.name;
    let URL=`https://api.themoviedb.org/3/movie/157336?api_key=${apikey}&query=${name}`
    axios.get(URL).then((result) => {
        let TVInfo = result.data.genres.map((element) => {
            return new TvInfoOb(element.name, element.id, element.department)
        });
        res.json(TVInfo);
        // res.send("hi");
        // console.log(result);
    })
    .catch((err) => {
        console.log(err.message);
        res.send(err.message);
    })
}
//constructor
function TvInfoOb(name,id,department)
{
    this.name=name;
    this.id=id;
    this.department=department;
}
function companiesHandler(req,res)
{
    let name=req.query.name;
    let URL=`https://api.themoviedb.org/3/company/1?api_key=${apikey}&query=${name}`
    axios.get(URL).then((result) => {
                let details =[];
                details.push(new CompanyInfo(result.data.id,result.data.name,result.data.homepage));
                res.json(details);
                // res.send("done");
                // console.log(result);
            })
            .catch((err) => {
                console.log(err.message);
                res.send(err.message);
            })
}
function CompanyInfo(id,name,homepage)
{
    this.id=id;
    this.name=name;
    this.homepage=homepage;
}

app.listen(PORT, () => {
    console.log(`hello from port ${PORT}`);
})

 