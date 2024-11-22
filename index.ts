import { GoogleGenerativeAI } from "@google/generative-ai"

const apiKey = process.env.apiKey;

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

function stdout(str:string) {
    process.stdout.write(str);
}

const hint = "Your turn: "
stdout(hint)
for await (const line of console) {
    const result = await model.generateContent(line);
    console.log(result.response.text());
    stdout(hint);
}
