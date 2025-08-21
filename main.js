import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import express from 'express';
dotenv.config(); 

const app = express();
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World');
}); 

app.get('/api/content',  async (req, res) => {
    try {

        const data = req.body.question;
        let response = await main(data);
        res.status(200).json({
            status:true,
            data:response
        });
        
    } catch (error) {
        console.error
        res.status(500).json({
            status:false,
            message:'Internal Server Error',
            error:error.message
        });
    }

});

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY,
});

async function main(data) {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents:data
    });
    return response;
}


app.listen(3000, () => {
    console.log('Server Running');
});