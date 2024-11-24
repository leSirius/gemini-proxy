export function stdout(str:string) {
    process.stdout.write(str);
}

export function print(...args:unknown[]) {
    console.log(...args);
}

