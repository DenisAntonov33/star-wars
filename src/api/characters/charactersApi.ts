import {apiGet} from "@/api/http/apiClient";

export class CharacterApi {
    static baseUrl = 'https://swapi.dev/api/people';
    static fetchCharacterList = (page: number, query = '') => {
        const params = new URLSearchParams();
        params.append('page', page.toString());
        if (query) {
            params.append('search', query);
        }
        return apiGet(`${CharacterApi.baseUrl}?${params.toString()}`)
    }

    static fetchCharacter(id: string) {
        return apiGet(`${CharacterApi.baseUrl}/${id}`)
    }
}
