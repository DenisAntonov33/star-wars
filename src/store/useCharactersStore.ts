import {ICharacterStore} from "@/store/types";
import {create} from "zustand";

export const useCharactersStore = create<ICharacterStore>()((setState) => ({
    isLoading: false,
    charactersList: [],
    charactersCount: 0,
    errorMessage: '',
    currentPage: 1,
}));
