import {ICharacterItemApiObject} from "@/api/characters/types";
import {ICharacterModel} from "@/store/character/types";
import {CharacterApi} from "@/api/characters/CharactersApi";
import {IListResponse} from "@/api/http/types";

export class CharacterApiProcessor {
    static fromApiCharacterList(apiResponse: IListResponse<ICharacterItemApiObject>): IListResponse<ICharacterModel> {
        return {...apiResponse, results: apiResponse.results.map(CharacterApiProcessor.fromApiCharacter)}
    }

    static fromApiCharacter(apiCharacter: ICharacterItemApiObject): ICharacterModel {
        const id = CharacterApiProcessor.getCharacterId(apiCharacter);
        return Object.assign({}, apiCharacter, {id}) as ICharacterModel;
    }

    static toApiCharacter(characterModel): ICharacterItemApiObject {
        const {id, ...apiCharacter} = characterModel;
        return apiCharacter as ICharacterItemApiObject;
    }

    private static getCharacterId(character: ICharacterItemApiObject): string {
        return character.url
            .replace(CharacterApi.baseUrl, '')
            .replaceAll('/', '')
    }
}