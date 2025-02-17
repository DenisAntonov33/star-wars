"use client"
import {useEffect} from "react";
import {charactersService} from "@/service/people/CharactersService";
import {useCharactersStore} from "@/store/useCharactersStore";

export default ({params}) => {
    const {currentCharacter} = useCharactersStore();
    const initData = async () => {
        const paramsData = await params;
        await charactersService.loadCharacter(paramsData.id);
    }
    useEffect(() => {
        initData();
    }, []);
    return (
        <div>
            {currentCharacter?.name}
        </div>
    )
}