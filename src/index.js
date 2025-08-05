import express, { response } from 'express';
import { config } from 'dotenv';
import {main} from './index1.js'

const app=express();

app.use(express.json());
config({path:"../.env"});
const PORT=process.env.PORT;


app.get("/",(req,res)=>{
    res.status(200).json({
        msg:"Oho bete Generative AI sikh Rahe ho"
    })
})
//Hit GenAi 
app.post("/chat",async (req,res)=>{
    const text=req.body.prompt;
    console.log(text)
    const answer=await main(text);

    res.send(answer)
})


app.listen(PORT ,()=>{
    console.log(`app listen on PORt: ${PORT}`)
})