import {ICharacterModel} from "@/store/character/types";
import {useCharactersStore} from "@/store/character/useCharactersStore";
import {charactersService} from "@/service/characters/CharactersService";
import {useEffect} from "react";

export const useCurrentCharacter = (id: string): ICharacterModel | null => {
    const charactersMap = useCharactersStore(state => state.charactersMap);

    useEffect(() => {
        if (!charactersMap.has(id)) {
            charactersService.loadCharacter(id);
        }
    }, [charactersMap])

    return charactersMap.get(id) ?? null;
}