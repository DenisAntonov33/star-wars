"use client"
import styles from "./page.module.css";
import {useEffect} from "react";
import {peopleService} from "@/service/people/PeopleService";
import {usePeopleStore} from "@/store/usePeopleStore";
import Link from "next/link";
import {Pagination} from "@mui/material";

export default function Home() {
    const {peopleList, isLoading, peopleCount, currentPage} = usePeopleStore();

    useEffect(() => {
        peopleService.loadPeople();
    }, []);

    const handlePageChange = (_, page: number) => {
        peopleService.loadPeople(page);
    }

    console.log('peopleCount >>', peopleCount)
    const pageTotal = Math.ceil(peopleCount / 10);

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                {isLoading && <div>Loading...</div>}
                {!isLoading && peopleList.map(item => (
                    <div key={item.name}>
                        <div>{item.name}</div>
                        <Link href={`/characters/${item.id}`}>Go</Link>
                    </div>
                ))}
            </main>
            <footer className={styles.footer}>
                <Pagination count={pageTotal} onChange={handlePageChange} />
            </footer>
        </div>
    );
}
