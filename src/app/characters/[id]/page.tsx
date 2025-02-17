"use client"
import React, {FormEvent, useState} from "react";
import {charactersService} from "@/service/characters/CharactersService";
import {Button, TextField, Typography} from "@mui/material";
import styles from './CharacterPage.module.css';
import {ICharacterModel} from "@/store/character/types";
import {useParams} from "next/navigation";
import {useCurrentCharacter} from "@/store/character/hooks/useCurrentCharacter";

enum CharacterEditForm {
    Height = 'height',
    Mass = 'mass',
    EyeColor = 'eye_color',
    HairColor = 'hair_color',
    SkinColor = 'skin_color',
}

const CharacterPage = () => {
    const params = useParams();
    const characterId = params['id'] as string;
    const currentCharacter = useCurrentCharacter(characterId);

    const [isEditing, setIsEditing] = useState(false);
    const handleEditClick = () => setIsEditing(true);
    const handleSaveClick = async (evt: FormEvent) => {
        evt.preventDefault();
        if (!currentCharacter) {
            return;
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const values = Object.entries(CharacterEditForm).map(([_, fieldName]) => {
            // @ts-expect-error form type validation
            const value = evt.target[fieldName].value;
            return [fieldName, value];
        });
        const newCharacter = Object.fromEntries(values) as Partial<ICharacterModel>;
        await charactersService.updateCharacter(currentCharacter.id, newCharacter);
        setIsEditing(false);
    };

    return (
        <main className={styles.root}>
            {currentCharacter && (
                <Typography variant="h1" component="div" title={currentCharacter.name}>
                    {currentCharacter.name}
                </Typography>
            )}
            {(currentCharacter && !isEditing) && (
                <>
                    <Typography variant="body2" fontSize={20}>
                        Height: {currentCharacter.height}
                    </Typography>
                    <Typography variant="body2" fontSize={20}>
                        Mass: {currentCharacter.mass}
                    </Typography>
                    <Typography variant="body2" fontSize={20}>
                        Eye color: {currentCharacter.eye_color}<br/>
                    </Typography>
                    <Typography variant="body2" fontSize={20}>
                        Hair color: {currentCharacter.hair_color}<br/>
                    </Typography>
                    <Typography variant="body2" fontSize={20}>
                        Skin color: {currentCharacter.skin_color}
                    </Typography>
                    <Button
                        onClick={handleEditClick}
                        variant="outlined"
                        style={{width: 150, marginTop: 40}}
                    >
                        Edit
                    </Button>
                </>
            )}
            {(currentCharacter && isEditing) && (
                <form className={styles.form} onSubmit={handleSaveClick}>
                    <TextField name={CharacterEditForm.Height} id={CharacterEditForm.Height} label="Height"
                               defaultValue={currentCharacter.height}
                               variant="standard"/>
                    <TextField name={CharacterEditForm.Mass} id={CharacterEditForm.Mass} label="Mass"
                               defaultValue={currentCharacter.mass}
                               variant="standard"/>
                    <TextField name={CharacterEditForm.EyeColor} id={CharacterEditForm.EyeColor} label="Eye color"
                               defaultValue={currentCharacter.eye_color}
                               variant="standard"/>
                    <TextField name={CharacterEditForm.HairColor} id={CharacterEditForm.HairColor} label="Hair color"
                               defaultValue={currentCharacter.hair_color}
                               variant="standard"/>
                    <TextField name={CharacterEditForm.SkinColor} id={CharacterEditForm.SkinColor} label="Skin color"
                               defaultValue={currentCharacter.skin_color}
                               variant="standard"/>
                    <Button
                        type={'submit'}
                        variant="outlined"
                        style={{width: 150, marginTop: 40}}
                    >
                        Save
                    </Button>
                </form>
            )}

        </main>
    )
}

export default CharacterPage;