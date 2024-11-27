import { destination, port, token } from "../utils/constant";
import { stdout } from "../utils/std";
import { connect, type Socket } from "bun";




export async function homeConversation() {
    const hint = "Your turn: ";
    stdout(hint);
    for await (const line of console) {

        const response = await fetch(`http://${destination}:${port}/gemini?token=${token}`, {
            method: "POST",
            body: JSON.stringify({ prompt: line }),
        });
        const body = await response.json();
        console.log(body.answer);
        stdout(hint);
    }
}

export async function tcpConnect(destination:string, port:number) {
    return connect({
        hostname: destination,
        port: port,
        socket: {
            data(socket, data) {
                console.log("Received:", data);
            },
            close() {
                console.log("Connection closed");
            },
            error(error) {
                console.error("Connection error:", error);
            },
        },
    });
}
