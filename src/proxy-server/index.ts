import dayjs from "dayjs";
import { print, saysCow, thinksCow } from "../utils/std.ts";
import type { GeminiReq } from "../utils/api";
import { geminiChat } from "../utils/gemini.ts";
import {listen} from "bun"
import { portUs as port, token } from "../utils/constant.ts";
import * as msgpack from 'messagepack';

export function startServer() {
    saysCow(`Listening at ${port}`);
    Bun.serve({
        port: port,
        fetch: async (req) => {
            const url = new URL(req.url);
            if (url.pathname === "/") return new Response("Home page!");
            if (url.pathname === "/time") return new Response(dayjs().format("YYYY-MM-DD HH:mm:ss"));
            if (req.method === "POST" && url.pathname === "/gemini") {
                const reqToken = url.searchParams.get("token");
                if (reqToken !== token) {
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
    thinksCow(`TCP listening at ${port}`);
    listen({
        hostname: "66.103.222.168",
        port: port,
        socket: {
            open(socket) {
                saysCow(`New client connected: ${socket.remoteAddress}`);
            },
            data: (socket, data) => {
                print('Received data:', msgpack.decode(data));
                socket.write('Hello from the server!\n');
            },
            close: (socket) => {
                saysCow(`Client disconnected: ${socket.remoteAddress}`, );
            },
            error: (socket, err) => {
                console.error('Error:', err);
            }
        },
    });
}