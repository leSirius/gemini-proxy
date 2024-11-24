import { stdout, print } from "./utils/std";
import { geminiChat } from "./proxy-server/gemini.ts";
import {startServer} from "./proxy-server";
import {exit} from "process";
import {json} from "node:stream/consumers";
import {stringify} from "node:querystring";

const port = process.env.PORT;
const region = process.env.REGION;
const destination = process.env.DESTINATION??"";
main();

function main() {
    if (region==="china"){
        homeConversation()
    }
    else if (region==="us") {
        startServer();
        // conversationLoop();
    }
    else {
        print("UNKNOWN REGION");
        exit(0);
    }

}

export async function homeConversation() {
    const hint = "Your turn: "
    stdout(hint)
    for await (const line of console) {
        const response = await fetch(`http://${destination}:${port}/gemini`, {
            method: "POST",
            body: JSON.stringify({prompt:line}),
        });
        const body = await response.json();
        console.log(body.answer);
        stdout(hint);
    }
}

export async function conversationLoop() {
    const hint = "Your turn: "
    stdout(hint)
    for await (const line of console) {
        const result = await geminiChat(line);
        print(result.response.text());
        stdout(hint);
    }
}