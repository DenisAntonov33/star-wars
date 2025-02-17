import { CharacterApiProcessor } from "@/api/characters/CharacterApiProcessor";
import {ICharacterItemApiObject} from "@/api/characters/types";
import {IListResponse} from "@/api/http/types";
import {ICharacterModel} from "@/store/character/types";

describe("CharacterApiProcessor", () => {
    const mockApiCharacter: ICharacterItemApiObject = {
        name: "Luke Skywalker",
        height: "172",
        mass: "77",
        birth_year: "19BBY",
        url: "https://swapi.dev/api/people/1/",
        hair_color: "blond",
        skin_color: "fair",
        eye_color: "blue",
    };

    describe("fromApiCharacter", () => {
        it("should transform API character to model including ID", () => {
            const result = CharacterApiProcessor.fromApiCharacter(mockApiCharacter);
            expect(result).toEqual({ ...mockApiCharacter, id: "1" });
        });
    });

    describe("fromApiCharacterList", () => {
        it("should transform a list of API characters into models", () => {
            const apiResponse: IListResponse<ICharacterItemApiObject> = {
                count: 1,
                next: null,
                prev: null,
                results: [mockApiCharacter]
            };

            const expectedResponse: IListResponse<ICharacterModel> = {
                count: 1,
                next: null,
                prev: null,
                results: [{ ...mockApiCharacter, id: "1" }]
            };

            const result = CharacterApiProcessor.fromApiCharacterList(apiResponse);
            expect(result).toEqual(expectedResponse);
        });
    });

    describe("toApiCharacter", () => {
        it("should remove the ID when transforming back to API object", () => {
            const characterModel: ICharacterModel = { ...mockApiCharacter, id: "1" };
            const result = CharacterApiProcessor.toApiCharacter(characterModel);
            expect(result).toEqual(mockApiCharacter);
        });
    });

    describe("getCharacterId", () => {
        it("should extract character ID from URL", () => {
            const result = CharacterApiProcessor["getCharacterId"](mockApiCharacter);
            expect(result).toBe("1");
        });
    });
});
