
export const region = process.env.REGION as "cn"|"us";
export const portUs = Number(process.env.PORT_US)
export const portCn = Number(process.env.PORT_CN);
export const destination = process.env.DESTINATION as string;
export const token = process.env.TOKEN as string;
