import { KeyOf } from './utilities'
export type Req = {
    jsonrpc: "2.0",
    id: number,
    method: string,
    params: unknown,
}


export type Res = {
    jsonrpc: "2.0",
    id: number,
    result?: any,
    error?: Err,
}  

export type Err = {
    code: number,
    message: string,
    data?: string,
}

export type Procedure = (req: Req) => Res;

/** The structure of the user-supplied type. */
export type Calls<T> = {
    [Property in keyof T]: (...req: any) => any
}