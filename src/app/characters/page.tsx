"use client"
import styles from "./page.module.css";
import {useEffect, useState} from "react";
import {charactersService} from "@/service/people/CharactersService";
import {useCharactersStore} from "@/store/useCharactersStore";
import Link from "next/link";
import {Pagination} from "@mui/material";
import {SearchBar} from "@/components/search-field/SearchField";

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

    const pageTotal = Math.ceil(charactersCount / 10);

    return (
        <div className={styles.page}>
            <SearchBar onChange={handleSearch}/>
            <main className={styles.main}>
                {isLoading && <div>Loading...</div>}
                {!isLoading && charactersList.map(item => (
                    <div key={item.name}>
                        <div>{item.name}</div>
                        <Link href={`/characters/${item.id}`}>Go</Link>
                    </div>
                ))}
            </main>
            <footer className={styles.footer}>
                <Pagination count={pageTotal} page={currentPage} onChange={handlePageChange}/>
            </footer>
        </div>
    );
}
