"use client"
import styles from "./page.module.css";
import {useEffect, useMemo, useState} from "react";
import {charactersService} from "@/service/people/CharactersService";
import {useCharactersStore} from "@/store/useCharactersStore";
import {Pagination} from "@mui/material";
import {SearchBar} from "@/components/search-field/SearchField";
import {CharacterCard} from "@/app/characters/components/CharacterCard";
import {SkeletonList} from "@/app/characters/components/SkeletonList";

export default function Home() {
    const {charactersList, isLoading, charactersCount} = useCharactersStore();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        charactersService.loadCharacters();
    }, []);

    const handlePageChange = (_, newPage: number) => {
        setCurrentPage(newPage);
        charactersService.loadCharacters(newPage, searchQuery);
    }
    
    const handleSearch = async (newQuery: string) => {
        setSearchQuery(newQuery);
        await charactersService.loadCharacters(1, newQuery)
        setCurrentPage(1);
    }

    const pageTotal = useMemo(() => {
        return Math.ceil(charactersCount / 10);
    }, [charactersCount])

    return (
        <div className={styles.page}>
            <SearchBar onChange={handleSearch}/>
            <main className={styles.main}>
                {isLoading && <SkeletonList />}
                {!isLoading && charactersList.map(item => (
                    <CharacterCard key={item.id} character={item} />
                ))}
            </main>
            <footer className={styles.footer}>
                <Pagination count={pageTotal} page={currentPage} onChange={handlePageChange}/>
            </footer>
        </div>
    );
}
