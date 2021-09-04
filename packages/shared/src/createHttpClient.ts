import { Calls, Req, Res } from "./types/common";

function createRPCPayload<T>(method: string, params: T): { params: T } & Req {
    return {
        jsonrpc: "2.0",
        id: 1,
        method,
        params,
    }
}

export function createHttpClient<T extends Calls<T>>(baseUrl) {
    const handler = {
        get(target, prop) {

            return async (body) => {

                type Call = T[keyof T];

                const payload = createRPCPayload<Parameters<Call>>(prop, body);

                const response = await fetch(baseUrl, {
                    method: "POST",
                    body: JSON.stringify(payload),
                });

                if (response.ok) {
                    return response
                        .json()
                        .then((d: Res) => d.result) as Promise<Res>;
                }

                return Promise.reject(response);
            }
        }
    };

    return new Proxy({}, handler) as T;
}