import dayjs from "dayjs";
import {print} from "../utils/std.ts";
import type {GeminiReq } from "../utils/api";
import {geminiChat} from "./gemini.ts";

const port = process.env.PORT || 8080;
const isDev = process.env.ENV==="development";

export function startServer() {
    print(`Listening at ${port}`);
    Bun.serve({
        port: port,
        development: isDev,
        fetch: async (req)=> {
            const url = new URL(req.url);
            console.log(`received ${url}`);
            if (url.pathname === "/") return new Response("Home page!");
            if (url.pathname==="/time") return new Response(dayjs().format("YYYY-MM-DD HH:mm:ss"));
            if (req.method==="POST"&&url.pathname==="/gemini") {
                const body:GeminiReq = await req.json();
                const {prompt} = body;
                const result = await geminiChat(prompt);
                return  Response.json({answer:result.response.text()});
            }
            throw new Error("whoops! A surprise 404");
        },
        error:(e)=>{
            console.error(e);
            return new Response(e.message);
                //{ {headers: {"Content-Type": "text/html"} }
        },
    });
}

