import {ICharacterStore} from "@/store/character/types";
import {create} from "zustand";

export const useCharactersStore = create<ICharacterStore>()(() => ({
    isLoading: true,
    charactersIdList: [],
    charactersMap: new Map(),
    charactersCount: 0,
    errorMessage: '',
    currentPage: 1,
}));
