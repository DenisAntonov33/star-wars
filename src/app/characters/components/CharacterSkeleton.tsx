import styles from "@/app/characters/components/CharacterCard.module.css";
import {Card, CardActions, CardContent, Skeleton} from "@mui/material";

export const CharacterSkeleton = () => {
    return (
        <Card className={styles.card}>
            <CardContent>
                <Skeleton variant="rectangular" width={'100%'} height={20} sx={{marginBottom: '8px'}} />
                <Skeleton variant="rectangular" width={'100%'} height={24} sx={{marginBottom: '8px'}} />
                <Skeleton variant="rectangular" width={'50%'} height={32} sx={{marginBottom: '12px'}} />
            </CardContent>
            <CardActions>
                <Skeleton variant="rectangular" width={'50%'} height={18} />
            </CardActions>
        </Card>
    )
}