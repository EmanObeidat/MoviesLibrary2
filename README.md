# MoviesLibrary2
**LAB11**
WRRC 
![wrrc](./Untitled%20(3).jpg)
overview

'Node JS':it is runtime enviroment to run js outside of browser(v8-engine);

'Express JS': JS framework to build server

"To create server:

1.npm test -y :yes

2.npm install express";

then: 1-require express framework: const express=require('express);

2-put the package inside another variable:const app=express(); const port=3000;

3-run the server and make it listening all the time: app.listen(port,()=>{ console.log() });


**lab12**
![wrrc](./Untitled%20(4).jpg)
installation

```1.a) **npm install cors**:
prevent send any request to my server;
b)const cors=require('cors);

c)app.use(cors())
```
```
2.a)**npm i dotenv **:prevent data push to github
b)create .env file in VS

c)write inside it what you wil not push to github
```

**lab13**
![wrrc](./Untitled%20(5).jpg)
```
1.\l list all databases
2.\q quit from database shell
3.\d list all tables I have inside the database
```
```
go inside your database shell : - server is running sqlstart - psql
```

**create a new database**
```
CREATE DATABASE databasename;
create a new table :
inside schema.sql file :
    CREATE TABLE table_name (
    column1 datatype,
    column2 datatype,
    column3 datatype,);
```
3. connect my table to my database
```
 psql  -d databasename -f schema.sql
Write qureis in my server:
```
```
npm install pg

In index.js:

const url="postgres://username:password@localhost:5432/databaseName" // store it in the .env file
create a new client instance

const { Client } = require('pg')
const client = new Client(url)
// connect to db
client.connect().then(() => {

    app.listen(PORT, () => {
        console.log(`Server is listening ${PORT}`);
    });
})
use client.query() to do CRUD
```

***lab14***
![wrrc](./Untitled%20(6).jpg)

```
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
```
```
DELETE FROM table_name WHERE condition;
```