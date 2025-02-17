import {apiGet, apiPatch} from "@/api/http/apiClient";
import {ICharacterModel} from "@/store/character/types";
import {ICharacterItemApiObject} from "@/api/characters/types";
import {IListResponse} from "@/api/http/types";
import {CharacterApiProcessor} from "@/api/characters/CharacterApiProcessor";

export class CharacterApi {
    static baseUrl = 'https://swapi.dev/api/people';
    static fetchCharacterList = (page: number, query = ''): Promise<IListResponse<ICharacterModel>> => {
        const params = new URLSearchParams();
        params.append('page', page.toString());
        if (query) {
            params.append('search', query);
        }
        return apiGet<IListResponse<ICharacterItemApiObject>>(`${CharacterApi.baseUrl}?${params.toString()}`)
            .then(CharacterApiProcessor.fromApiCharacterList)
    }

    static fetchCharacter(id: string): Promise<ICharacterModel> {
        return apiGet<ICharacterModel>(`${CharacterApi.baseUrl}/${id}`)
            .then(CharacterApiProcessor.fromApiCharacter)
    }

    static patchCharacter = (characterId: string, updatedCharacter: ICharacterModel): Promise<ICharacterModel> => {
        const characterPayload = CharacterApiProcessor.toApiCharacter(updatedCharacter);
        return apiPatch<ICharacterModel, ICharacterItemApiObject>(`${CharacterApi.baseUrl}/${characterId}`, characterPayload)
            .then(CharacterApiProcessor.fromApiCharacter);
    }
}
