export type Req<T> = {
    jsonrpc: "2.0",
    id: number,
    method: string,
    params: T,
}

export type Res<T> = {
    jsonrpc: "2.0",
    id: number,
} & (
        | { result: T, error?: never }
        | { result?: never, error: Err }
    )

export type Err = {
    code: number,
    message: string,
    data?: string,
}