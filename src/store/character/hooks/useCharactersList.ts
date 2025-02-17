import {useCharactersStore} from "@/store/character/useCharactersStore";
import {ICharacterModel} from "@/store/character/types";

export const useCharactersList = (): ICharacterModel[] => {
    const idList = useCharactersStore(state => state.charactersIdList);
    const map = useCharactersStore(state => state.charactersMap);

    return idList.map(id => map.get(id)!);
}