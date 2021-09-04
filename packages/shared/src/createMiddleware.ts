import { Calls, Err, Procedure, Req, Res } from './types/common';
import { ExpressMiddleware, MiddlwareImpl } from './types/server';
import { KeyOf } from './types/utilities';

function createHandler<T extends { [Property in KeyOf<T>]: (req: Parameters<T[KeyOf<T>]>) => { response: ReturnType<T[KeyOf<T>]>, error?: Err } }>(implementation: T) {

    const handler = {
        get(target, prop: KeyOf<T>) {
            if (prop in implementation) {
                return implementation[prop];
            }

            return () => console.log("handle not implemented error");
        }
    }

    return new Proxy({}, handler) as T;
}

export function createMiddleware<T extends Calls<T>>(baseUrl, implementation: MiddlwareImpl<T, T[keyof T]>) {
    // when request to endpoint comes in, needs to route based on request.body.method

    // the implementation won't be Req => Res, it'll be ReqDTO => ResDTO.
    // But when getting to the request handler, these need to be treated as Req & Res
    const proxy = createHandler(implementation);

    type Call = T[keyof T];
    type Params = Parameters<Call>;
    type ResponseType = ReturnType<Call>;

    // The express middleware should expect requests & responses with RPC-specific properties (i.e. Req and Res)
    // but with the user-supplied types as the parameters/result.
    const requestHandler: ExpressMiddleware<Req & { params: Params }, Res & { result?: ResponseType }> = (req, res, next) => {

        // call user function from implementation
        const { response, error } = proxy[req.body.method](req.body.params);

        if (error) {
            const body: Res = {
                jsonrpc: "2.0",
                id: req.body.id,
                error,
            }
            res.json(body);
        } else {
            const body: Res & { result?: ResponseType } = {
                jsonrpc: "2.0",
                id: req.body.id,
                result: response
            }
            res.json(body);
        }

        next();
    };

    return requestHandler;
}