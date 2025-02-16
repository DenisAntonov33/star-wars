import {ICharacterStore} from "@/store/types";
import {create} from "zustand";

export const usePeopleStore = create<ICharacterStore>()((setState) => ({
    isLoading: false,
    peopleList: [],
    peopleCount: 0,
    errorMessage: '',
    currentPage: 1,
}));
