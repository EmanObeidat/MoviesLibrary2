`use strict`
const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const Mdata=require("./data.json")
require('dotenv').config();
const bodyParser = require('body-parser');
const { Client } = require('pg');

const PORT = process.env.PORT;
const apikey = process.env.API_KEY;
let URL=process.env.URL;
const client = new Client(URL);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/', homePageHandler);
app.get('/favorite',favHandler);//lab11
app.get('/trending', trendingHandler);//lab12
app.get('/search', movieNameSearch);
app.get('/populer', popularMovieHandler);
app.get('/companies',companiesHandler)
app.get('/',homePageHandler);
app.post('/addMovie', addMovieHandler)//lab13
app.get('/getData', getDataHandler)
app.put('/UPDATE/:id',updateTable);//lab14
app.delete('/DELETE/:id',deleteTable);
app.get('/getMovie/:id',getMovieHandler);
app.use(errorHandler);
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
function popularMovieHandler(req, res)
{
    let URL=`https://api.themoviedb.org/3/movie/popular?api_key=${apikey}&language=en-US&page=1`
    axios.get(URL).then((result) => {
        let Info = result.data.results.map((element) => {
            return new seInfoOb(element.poster_path, element.overview, element.release_date)
        });
        res.json(Info);
        // res.send("hi");
        // console.log(result);

    })
    .catch((err) => {
        console.log(err.message);
        res.send(err.message);
    })
}
//constructor
function seInfoOb(poster_path,overview,release_date)
{
    this.poster_path=poster_path;
    this.overview=overview;
    this.release_date=release_date;
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
//lab13
function addMovieHandler(req, res) {
  
    console.log(req.body);
    let {original_title,release_date,poster_path,overview,myComment} = req.body;
    let sql = `INSERT INTO MovieTable (original_title, release_date, poster_path,overview,myComment)
    VALUES ($1,$2,$3,$4,$5) RETURNING *; `
    let values = [original_title,release_date,poster_path,overview,myComment]
    
    client.query(sql, values).then((result) => {
        console.log(result.rows)
        res.status(201).json(result.rows);

    }).catch((err) => {
      console.log("error")
        errorHandler(err, req, res);
    })
}
//read all data from database table
function getDataHandler(req, res) {
    let id=req.params.id;
    let sql = `SELECT * FROM MovieTable;`;
    client.query(sql).then((result) => {
        console.log(result);
        res.json(result.rows)
    }).catch((err) => {
        errorHandler(err, req, res)
    })
}
//handel error 500
function errorHandler(err, req, res, next) {
    return res.status(500).json({ status: 500, responseText: "ERROR 500" });
}

//lab14
function updateTable(req,res){
  // console.log(111,req.params)
    let idParams= req.params.id;
    let {original_title,release_date,poster_path,overview,myComment} = req.body;
    let sql= `UPDATE MovieTable SET original_title=$1, release_date=$2,poster_path=$3,overview=$4,myComment=$5 WHERE id=$6 RETURNING *;`;
    let values = [original_title,release_date,poster_path,overview,myComment,idParams]

    client.query(sql,values).then((result)=>{
      console.log(result.rows);
      res.send("updated");
    }).catch((err)=>{
      errorHandler(err,req,res);
    })
  }
  function deleteTable(req,res){
    let idParams = req.params.id; //destructuring
    let sql=`DELETE FROM MovieTable WHERE id = $1;` ;
    let value = [idParams];
    client.query(sql,value).then(result=>{
        res.status(201).send("deleted");
    }).catch()
  }

  function getMovieHandler(req,res){
    let id= req.params.id;
    let values=[id];
    let sql=`SELECT * FROM MovieTable WHERE id = $1`
    client.query(sql).then((result)=>{
      res.json(result.rows);
    }).catch((err)=>{
      errorHandler(err,req,res);
    })
  }
client.connect().then(()=>{
    app.listen(PORT,()=>{
        console.log(`hello from  port ${PORT}`);
    })

}).catch()
 