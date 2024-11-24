import { stdout, print } from "./utils/std";
import { geminiChat } from "./gemini";
import {startServer} from "./server.ts";

main();

function main() {
    startServer();
    conversationLoop();

}

async function conversationLoop() {
    const hint = "Your turn: "
    stdout(hint)
    for await (const line of console) {
        const result = await geminiChat(line);
        print(result.response.text());
        stdout(hint);
    }
}