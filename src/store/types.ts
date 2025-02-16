import {ICharacterItemApiResponse} from "@/api/characters/types";

export interface ICharacterStore {
    charactersList: ICharacterModel[];
    charactersCount: number;
    isLoading: boolean;
    errorMessage: string;
    currentPage: number;
}

export interface ICharacterModel extends ICharacterItemApiResponse {
    id: string;
}