import dayjs from "dayjs";
import { print } from "../utils/std.ts";
import type { GeminiReq } from "../utils/api";
import { geminiChat } from "../utils/gemini.ts";
import {listen} from "bun"

const port = Number(process.env.PORT) || 8080;
const passToken = process.env.TOKEN

export function startServer() {
    print(`Listening at ${port}`);
    Bun.serve({
        port: port,
        fetch: async (req) => {
            const url = new URL(req.url);
            if (url.pathname === "/") return new Response("Home page!");
            if (url.pathname === "/time") return new Response(dayjs().format("YYYY-MM-DD HH:mm:ss"));
            if (req.method === "POST" && url.pathname === "/gemini") {
                const token = url.searchParams.get("token");
                if (token !== passToken) {
                    return Response.json({ message: "Invalid token" }, { status: 401 });
                }
                const body: GeminiReq = await req.json();
                const { prompt } = body;
                const result = await geminiChat(prompt);
                return Response.json({ answer: result.response.text() });
            }
            throw new Error("whoops! A surprise 404");
        },
        error: (e) => {
            return new Response(e.message);
            //{ {headers: {"Content-Type": "text/html"} }
        },
    });
}


export function startTCPServer() {
    print(`TCP listening at ${port}`);
    listen({
        hostname: "66.103.222.168",
        port: port,
        socket: {
            open(socket) {
                print('New client connected:', socket.remoteAddress);
            },
            data: (socket, data) => {
                console.log('Received data:', data.toString());
                socket.write('Hello from the server!\n');
            },
            close: (socket) => {
                console.log('Client disconnected:', socket.remoteAddress);
            },
            error: (socket, err) => {
                console.error('Error:', err);
            }
        },
    });
}