
function createRPCPayload(method: string, params) {
    return {
        jsonrpc: "2.0",
        id: 1,
        method,
        params,
    }
}

export function createHttpClient<T>(baseUrl) {
    const handler = {
        get(target, prop) {

            return async (body) => {

                const payload = createRPCPayload(prop, body);

                const response = await fetch(baseUrl, {
                    method: "POST",
                    body: JSON.stringify(payload),
                });

                if (response.ok) {
                    return response.json();
                }

                return Promise.reject(response);
            }
        }
    };

    return new Proxy({}, handler) as T;
}