import { GoogleGenerativeAI } from "@google/generative-ai"
import { exit } from "process";

const apiKey = process.env.APIKEY;
const modelAI = initServer(apiKey);

function initServer(apiKey:string|undefined) {
    if (!apiKey) { 
        console.error(`not a valid api key: ${apiKey}`)
        exit(0)
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    return  genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
}

export async function geminiChat(prompt:string) {
    return modelAI.generateContent(prompt);
}