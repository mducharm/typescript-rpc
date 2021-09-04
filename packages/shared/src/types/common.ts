export type Req = {
    jsonrpc: "2.0",
    id: number,
    method: string,
    params: any,
}

export type Res = {
    jsonrpc: "2.0",
    id: number,
} & (
        | { result: any, error?: never }
        | { result?: never, error: Err }
    )

export type Err = {
    code: number,
    message: string,
    data?: string,
}