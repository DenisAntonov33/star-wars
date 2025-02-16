import {CharacterSkeleton} from "@/app/characters/components/CharacterSkeleton";

const items = new Array(10).fill(undefined);

export const SkeletonList = () => {
    return items.map((_, idx) => (
        <CharacterSkeleton key={idx} />
    ))
}