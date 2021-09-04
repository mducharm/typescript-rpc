import { createHttpClient } from "./createHttpClient"
import { createMiddleware } from "./createMiddleware";

type UserRequest = {
    id: number;
}
type UserResponse = {
    id: number;
    name: string;
    email: string;
}
export interface MyCalls {
    getUser: (req: UserRequest) => UserResponse,
}

const client = createHttpClient<MyCalls>("/api");

const middleware = createMiddleware<MyCalls>("/api", {
    getUser(req: UserRequest) {
        return {
            response: {
                id: 1,
                name: "test",
                email: "test",
            },
            // error: {}
        }
    }
})

const example = async () => {
    const user = await client.getUser({ id: 1 });
}