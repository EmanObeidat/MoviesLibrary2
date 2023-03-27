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