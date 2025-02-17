import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import React from "react";
import {ICharacterModel} from "@/store/character/types";
import Link from "next/link";
import styles from './CharacterCard.module.css';

interface ICharacterCardProps {
    character: ICharacterModel;
}

export const CharacterCard: React.FC<ICharacterCardProps> = ({character}) => {
    return (
        <Card className={styles.card}>
            <CardContent>
                <Typography gutterBottom sx={{color: 'text.secondary', fontSize: 14}}>
                    Birth: {character.birth_year}
                </Typography>
                <Typography variant="h5" component="div" noWrap title={character.name}>
                    {character.name}
                </Typography>
                <Typography variant="body2">
                    Height: {character.height}<br/>
                    Mass: {character.mass}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">
                    <Link href={`/characters/${character.id}`}>Read more</Link>
                </Button>
            </CardActions>
        </Card>
    )
}