import {say, think} from "cowsay"

export function stdout(str:string) {
    process.stdout.write(str);
}

export function print(...args:unknown[]) {
    console.log(...args);
}


export function saysCow(text:string) {
    print(say({text:text}))
}
export function thinksCow(text:string) {
    print(think({text:text}));
}