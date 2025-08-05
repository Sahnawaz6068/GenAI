import {GoogleGenAI} from '@google/genai';
import { config } from 'dotenv';
config({path:"../.env"});

const key=process.env.GEMINI_API_KEY;
const GenAI=new GoogleGenAI({apiKey:key});

async function main(text) {
    const response=await GenAI.models.generateContent({
        model:'gemini-2.0-flash-001',
        contents:[
            {
                role:"user",
                parts:[{text:"Hey gemni how are you,My Name is Sahnawaz Hussain I am working Hard on My Full Stack Skill Set"}]
            },
            {
                role:"model",
                parts:[{text:"Hello Sahnawaz, I'm doing very well, thank you for asking!"}]
            },
            {
                role:"user",
                parts:[{text:text}]
            }
        ]
    });
    console.log(response.text);
}

module.exports=main
