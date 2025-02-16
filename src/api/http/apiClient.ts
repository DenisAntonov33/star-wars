export const apiGet = (input: string | URL | globalThis.Request, init?: RequestInit) => {
    return fetch(input, init).then(r => r.json());
}