import express from "express"
import cors from "cors"
import mongoose from "mongoose"

import pusher from "pusher"
import dbmodel from "./dbmodel.js"

// app config 

const app = express();
const port = process.env.PORT || 8080;

//middlewares

app.use(express.json());
app.use(cors());


//DB config 
  const connection_url = 'mongodb+srv://admin:NUqy9vFFKKjOHJIt@cluster0.0qnkh.mongodb.net/instaDB?retryWrites=true&w=majority'
mongoose.connect(connection_url,{
   useCreateIndex:true,
   useNewUrlParser:true,
   useUnifiedTopology:true

})

mongoose.connection.once("open",() =>{
    console.log("DB connected");
})

// api routes 

app.get("/",(req,res) => res.status(200).send(`fuck world`))

app.post('/upload',(req,res)=>{

    const body = req.body;

    dbmodel.create(body,(err,data)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(201).send(data);
        }

    });

});

   app.get('/sync',(req,res)=> {
       dbmodel.find((err,data)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).send(data);
        }

       });
   });

// listen

app.listen(port,() => console.log(`listening on localhost:${port}`));