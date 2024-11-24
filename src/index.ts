import { stdout, print } from "./utils/std";
import { geminiChat } from "./proxy-server/gemini.ts";
import {startServer} from "./proxy-server";
import {exit} from "process";
import {json} from "node:stream/consumers";
import {stringify} from "node:querystring";

const region = process.env.REGION;

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
    print(await fetch("http://64.176.224.37:8080"));
    const hint = "Your turn: "
    stdout(hint)
    for await (const line of console) {
        const response = await fetch("http://64.176.224.37:8080", {
            method: "POST",
            body: stringify({prompt:line}),
        });
        print(await response.json());
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