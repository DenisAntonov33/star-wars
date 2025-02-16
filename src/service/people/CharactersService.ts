import {useCharactersStore} from "@/store/useCharactersStore";
import {CharacterApi} from "@/api/characters/charactersApi";
import {ICharacterModel, ICharacterStore} from "@/store/types";
import {ICharacterItemApiResponse} from "@/api/characters/types";

class CharactersService {
    async loadCharacters(page = 1, query = '') {
        try {
            useCharactersStore.setState({isLoading: true})
            const response = await CharacterApi.fetchCharacters(page, query);
            useCharactersStore.setState<ICharacterStore>({
                isLoading: false,
                currentPage: page,
                charactersList: this.addCharacterId(response.results),
                charactersCount: response.count
            });
        } catch (e) {
            console.debug('e >>', e)
            if (e instanceof Error) {
                useCharactersStore.setState({isLoading: false, errorMessage: e.message});
            } else {
                useCharactersStore.setState({isLoading: false, errorMessage: 'Something went wrong'});
            }
        }
    }

    private addCharacterId(characterList: ICharacterItemApiResponse[]): ICharacterModel[] {
        return characterList.map((item =>
            Object.assign(item, {id: this.extractCharacterId(item)}) as ICharacterModel))
    }

    private extractCharacterId(character: ICharacterItemApiResponse) {
        return character.url
            .replace(CharacterApi.baseUrl, '')
            .replace('/', '')
    }
}

export const charactersService = new CharactersService();