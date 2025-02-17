import {useCharactersStore} from "@/store/character/useCharactersStore";
import {CharacterApi} from "@/api/characters/CharactersApi";
import {ICharacterModel, ICharacterStore} from "@/store/character/types";

class CharactersService {
    async loadCharacters(page = 1, query = '') {
        try {
            useCharactersStore.setState?.({isLoading: true})
            const response = await CharacterApi.fetchCharacterList(page, query);
            const {charactersMap} = useCharactersStore.getState?.();
            const charactersIdList = response.results.map(item => item.id);
            const newCharactersMap = this.updateCharactersMap(charactersMap, response.results);
            useCharactersStore.setState<ICharacterStore>?.({
                isLoading: false,
                currentPage: page,
                charactersIdList: charactersIdList,
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
            const response = await CharacterApi.fetchCharacter(id);

            useCharactersStore.setState?.({
                charactersMap: this.updateCharactersMap(charactersMap, [response])
            });
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

            useCharactersStore.setState?.({
                charactersMap: this.updateCharactersMap(charactersMap, [response])
            })
        } catch (e) {
            console.debug('Something went wrong while patching character');
        }
    }

    private updateCharactersMap(map: Map<string, ICharacterModel>, list: ICharacterModel[]): Map<string, ICharacterModel> {
        const newMap = new Map(map);
        list.forEach(item => {
            newMap.set(item.id, item);
        });
        return newMap;
    }
}

export const charactersService = new CharactersService();