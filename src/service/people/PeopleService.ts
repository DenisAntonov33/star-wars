import {usePeopleStore} from "@/store/usePeopleStore";
import {CharacterApi} from "@/api/characters/charactersApi";
import {ICharacterModel, ICharacterStore} from "@/store/types";
import {ICharacterItemApiResponse} from "@/api/characters/types";

class PeopleService {
    async loadPeople(page = 1) {
        try {
            usePeopleStore.setState({isLoading: true})
            const response = await CharacterApi.fetchPeople(page);
            console.log('response >>', response)
            usePeopleStore.setState<ICharacterStore>({
                isLoading: false,
                currentPage: page,
                peopleList: this.addCharacterId(response.results),
                peopleCount: response.count
            });
        } catch (e) {
            console.debug('e >>', e)
            if (e instanceof Error) {
                usePeopleStore.setState({isLoading: false, errorMessage: e.message});
            } else {
                usePeopleStore.setState({isLoading: false, errorMessage: 'Something went wrong'});
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

export const peopleService = new PeopleService();