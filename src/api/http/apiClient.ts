export const apiGet = (input: string | URL, init?: RequestInit) => {
    console.debug('GET input >>', input);
    return fetch(input, init).then(r => r.json());
}

export const apiPatch = (input: string | URL, payload) => {
    console.debug('PATCH payload >>', payload);
    return Promise.resolve(payload);
}