"use client"
import styles from "./page.module.css";
import {useEffect, useMemo, useState} from "react";
import {charactersService} from "@/service/characters/CharactersService";
import {useCharactersStore} from "@/store/character/useCharactersStore";
import {Pagination} from "@mui/material";
import {SearchBar} from "@/components/search-field/SearchField";
import {CharacterCard} from "@/app/characters/components/CharacterCard";
import {SkeletonList} from "@/app/characters/components/SkeletonList";
import {useCharactersList} from "@/store/character/hooks/useCharactersList";
import debounce from "@mui/utils/debounce";

const DEBOUNCE_SEARCH_TIME = 500;

export default function Home() {
    const {isLoading, charactersCount} = useCharactersStore();
    const charactersList = useCharactersList();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        charactersService.loadCharacters();
    }, []);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
        setCurrentPage(newPage);
        charactersService.loadCharacters(newPage, searchQuery);
    }

    const handleSearch = debounce(async (newQuery: string) => {
        setSearchQuery(newQuery);
        await charactersService.loadCharacters(1, newQuery)
        setCurrentPage(1);
    }, DEBOUNCE_SEARCH_TIME)

    const pageTotal = useMemo(() => {
        return Math.ceil(charactersCount / 10);
    }, [charactersCount])

    return (
        <>
            <SearchBar onChange={handleSearch}/>
            <main className={styles.main}>
                {isLoading && <SkeletonList/>}
                {!isLoading && charactersList.map(item => (
                    <CharacterCard key={item.id} character={item}/>
                ))}
            </main>
            <footer className={styles.footer}>
                <Pagination count={pageTotal} page={currentPage} onChange={handlePageChange}/>
            </footer>
        </>
    );
}
