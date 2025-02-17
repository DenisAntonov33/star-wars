export const apiGet = <Response>(input: string | URL, init?: RequestInit): Promise<Response> => {
    console.debug('GET input >>', input);
    return fetch(input, init).then(r => r.json());
}

export const apiPatch = <Response, Payload = {}>(input: string | URL, payload: Payload): Promise<Response> => {
    console.debug('PATCH payload >>', payload);
    return Promise.resolve(payload);
}