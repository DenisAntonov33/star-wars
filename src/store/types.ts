import {ICharacterItemApiResponse} from "@/api/characters/types";

export interface ICharacterStore {
    charactersList: ICharacterModel[];
    charactersMap: Map<string, ICharacterModel>;
    charactersCount: number;
    isLoading: boolean;
    errorMessage: string;
    currentPage: number;
    currentCharacter: ICharacterModel | null;
}

export interface ICharacterModel extends ICharacterItemApiResponse {
    id: string;
}