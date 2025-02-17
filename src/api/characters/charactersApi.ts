import {apiGet, apiPatch} from "@/api/http/apiClient";
import {ICharacterModel} from "@/store/types";
import {ICharacterItemApiResponse} from "@/api/characters/types";

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

    static patchCharacter = (characterId: string, updatedCharacter: ICharacterModel): Promise<ICharacterItemApiResponse> => {
        const {id, ...characterPayload} = updatedCharacter;
        return apiPatch(`${CharacterApi.baseUrl}/${id}`, characterPayload);
    }
}
