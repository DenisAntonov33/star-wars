import {ICharacterStore} from "@/store/types";
import {create} from "zustand";

export const useCharactersStore = create<ICharacterStore>()((setState) => ({
    isLoading: true,
    charactersList: [],
    charactersMap: new Map(),
    charactersCount: 0,
    errorMessage: '',
    currentPage: 1,
    currentCharacter: null
}));
