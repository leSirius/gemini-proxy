import { stdout, print } from "./utils/std";
import { geminiChat } from "./utils/gemini.ts";
import { startServer, startTCPServer } from "./proxy-server";
import { exit } from "process";
import { homeConversation, tcpConnect } from "./home-server/index.ts";
import { region, destination, port } from "./utils/constant.ts";

main();

function main() {
    if (region === "cn") {
        // homeConversation()
        (async() =>{
            const socket = await tcpConnect(destination, port);
    
        })();

    }
    else if (region === "us") {
        startTCPServer();
        // startServer();
        // conversationLoop();
    }
    else {
        print("UNKNOWN REGION");
        exit(0);
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