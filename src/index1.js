import {GoogleGenAI} from '@google/genai';
import { config } from 'dotenv';
config({path:"../.env"});
const key=process.env.GEMINI_API_KEY;

const GenAI=new GoogleGenAI({apiKey:key});

export async function main(text) {
    const response=await GenAI.models.generateContent({
        model:'gemini-2.0-flash-001',
        contents:text
    });
   return response.text;
}
