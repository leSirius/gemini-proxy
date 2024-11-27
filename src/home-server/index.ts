import { destination, portUs as port, token } from "../utils/constant";
import { stdout, print } from "../utils/std";
import { connect, type Socket } from "bun";
import * as msgpack from 'messagepack';

export async function tcpConnect(destination:string, port:number) {
    const socket = await connect({
        hostname: destination,
        port: port,
        socket: {
            data:(socket, data)=> {
                stdout(`Received: ${data.toString()}`);
            },
            close:()=> {
                console.log("Connection closed");
            },
            error(error) {
                console.error("Connection error:", error);
            },
            connectError:(socket, error)=> {
                console.error(error);
            }, 
            end:(socket)=> {
                console.log("Server left us alone")
            }, 
            timeout:(socket)=> {
                console.log("you've run out of your time")
            }, 
        }
    });
    const buffer = 
    socket.write(msgpack.encode({token:"SECRET"}));
    setTimeout(() => {
        socket.write(msgpack.encode("hello again"));
    }, 3000);

}
