import dayjs from "dayjs";
import {print} from "../utils/std.ts";
import type {GeminiReq } from "../utils/api";
import {geminiChat} from "./gemini.ts";

const port = process.env.PORT || 8080;
const passToken = process.env.TOKEN

export function startServer() {
    print(`Listening at ${port}`);
    Bun.serve({
        port: port,
        fetch: async (req)=> {
            const url = new URL(req.url);
            if (url.pathname === "/") return new Response("Home page!");
            if (url.pathname==="/time") return new Response(dayjs().format("YYYY-MM-DD HH:mm:ss"));
            if (req.method==="POST"&&url.pathname==="/gemini") {
                const token = url.searchParams.get("token");
                if (token!==passToken) {
                    return Response.json({message:"Invalid token"}, {status: 401});
                }
                const body:GeminiReq = await req.json();
                const {prompt} = body;
                const result = await geminiChat(prompt);
                return  Response.json({answer:result.response.text()});
            }
            throw new Error("whoops! A surprise 404");
        },
        error:(e)=>{
            return new Response(e.message);
                //{ {headers: {"Content-Type": "text/html"} }
        },
    });
}

