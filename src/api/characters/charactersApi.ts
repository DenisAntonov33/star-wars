import {apiGet} from "@/api/http/apiClient";

export class CharacterApi {
    static baseUrl = 'https://swapi.dev/api/people';
    static fetchPeople = (page: number) => {
        const query = new URLSearchParams();
        query.append('page', page.toString());
        return apiGet(`${CharacterApi.baseUrl}?${query.toString()}`)
    }
}
