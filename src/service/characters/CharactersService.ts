import {useCharactersStore} from "@/store/useCharactersStore";
import {CharacterApi} from "@/api/characters/charactersApi";
import {ICharacterModel, ICharacterStore} from "@/store/types";
import {ICharacterItemApiResponse} from "@/api/characters/types";

class CharactersService {
    async loadCharacters(page = 1, query = '') {
        try {
            useCharactersStore.setState?.({isLoading: true})
            const response = await CharacterApi.fetchCharacterList(page, query);
            const {charactersMap} = useCharactersStore.getState?.();
            const charactersList = this.addCharacterId(response.results);
            const newCharactersMap = this.updateCharactersMap(charactersMap, charactersList);
            useCharactersStore.setState<ICharacterStore>?.({
                isLoading: false,
                currentPage: page,
                charactersList: charactersList,
                charactersMap: newCharactersMap,
                charactersCount: response.count
            });
        } catch (e) {
            console.debug('e >>', e)
            if (e instanceof Error) {
                useCharactersStore.setState?.({isLoading: false, errorMessage: e.message});
            } else {
                useCharactersStore.setState?.({isLoading: false, errorMessage: 'Something went wrong'});
            }
        }
    }

    async loadCharacter(id: string) {
        try {
            const {charactersMap} = useCharactersStore.getState?.();
            if (charactersMap.has(id)) {
                useCharactersStore.setState?.({currentCharacter: charactersMap.get(id)})
                return;
            }

            const response = await CharacterApi.fetchCharacter(id);
            this.updateCharactersMap(charactersMap, [response]);
            useCharactersStore.setState?.({currentCharacter: response})
        } catch (e) {
            console.debug('error >>', e)
        }
    }

    async updateCharacter(id: string, updatedCharacter: Partial<ICharacterModel>) {
        try {
            const {charactersMap} = useCharactersStore.getState?.();
            const targetCharacter: ICharacterModel = charactersMap.get(id);
            const newCharacter = Object.assign({}, targetCharacter, updatedCharacter);
            const response = await CharacterApi.patchCharacter(id, newCharacter);
            charactersMap.set(id, response);
        } catch (e) {
            console.debug('Something went wrong while patching character');
        }
    }

    private addCharacterId(characterList: ICharacterItemApiResponse[]): ICharacterModel[] {
        return characterList.map((item =>
            Object.assign(item, {id: this.extractCharacterId(item)}) as ICharacterModel))
    }

    private extractCharacterId(character: ICharacterItemApiResponse) {
        return character.url
            .replace(CharacterApi.baseUrl, '')
            .replaceAll('/', '')
    }

    private updateCharactersMap(map: Map<string, ICharacterModel>, list: ICharacterModel[]): Map<string, ICharacterModel> {
        const newMap = new Map(map);
        list.forEach(item => {
            newMap.set(item.id, item);
        })
        return newMap;
    }
}

export const charactersService = new CharactersService();