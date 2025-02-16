import {ICharacterItemApiResponse} from "@/api/characters/types";

export interface ICharacterStore {
    peopleList: ICharacterModel[];
    peopleCount: number;
    isLoading: boolean;
    errorMessage: string;
    currentPage: number;
}

export interface ICharacterModel extends ICharacterItemApiResponse {
    id: string;
}