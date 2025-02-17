import {ICharacterItemApiObject} from "@/api/characters/types";

export interface ICharacterStore {
    charactersIdList: string[];
    charactersMap: Map<string, ICharacterModel>;
    charactersCount: number;
    isLoading: boolean;
    errorMessage: string;
    currentPage: number;
}

export interface ICharacterModel extends ICharacterItemApiObject {
    id: string;
}