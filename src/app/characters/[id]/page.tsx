"use client"
import React, {useEffect, useState} from "react";
import {charactersService} from "@/service/characters/CharactersService";
import {useCharactersStore} from "@/store/useCharactersStore";
import {Button, TextField, Typography} from "@mui/material";
import styles from './CharacterPage.module.css';
import {ICharacterModel} from "@/store/types";

enum CharacterEditForm {
    Height = 'height',
    Mass = 'mass',
    EyeColor = 'eye_color',
    HairColor = 'hair_color',
    SkinColor = 'skin_color',
}

export default ({params}) => {
    const {currentCharacter} = useCharactersStore();
    const initData = async () => {
        const paramsData = await params;
        await charactersService.loadCharacter(paramsData.id);
    }
    useEffect(() => {
        initData();
    }, []);
    const [isEditing, setIsEditing] = useState(true);
    const handleEditClick = () => setIsEditing(true);
    const handleSaveClick = async (evt) => {
        evt.preventDefault();
        if (!currentCharacter) {
            return;
        }

        const values = Object.entries(CharacterEditForm).map(([_, fieldName]) => {
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
                    <TextField name={CharacterEditForm.Height} id={CharacterEditForm.Height} label="Standard"
                               defaultValue={currentCharacter.height}
                               variant="standard"/>
                    <TextField name={CharacterEditForm.Mass} id={CharacterEditForm.Mass} label="Standard"
                               defaultValue={currentCharacter.mass}
                               variant="standard"/>
                    <TextField name={CharacterEditForm.EyeColor} id={CharacterEditForm.EyeColor} label="Standard"
                               defaultValue={currentCharacter.eye_color}
                               variant="standard"/>
                    <TextField name={CharacterEditForm.HairColor} id={CharacterEditForm.HairColor} label="Standard"
                               defaultValue={currentCharacter.hair_color}
                               variant="standard"/>
                    <TextField name={CharacterEditForm.SkinColor} id={CharacterEditForm.SkinColor} label="Standard"
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