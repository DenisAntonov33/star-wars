import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {SearchWrapper} from "@/components/search-field/styled/SearchWrapper";
import {SearchIconWrapper} from "@/components/search-field/styled/SearchIconWrapper";
import {SearchInputBase} from "@/components/search-field/styled/SearchInputBase";

interface ISearchBarProps {
    onChange(value: string): void;
}

export const SearchBar: React.FC<ISearchBarProps> = ({onChange}) => {
    return (
        <SearchWrapper>
            <SearchIconWrapper>
                <SearchIcon/>
            </SearchIconWrapper>
            <SearchInputBase
                placeholder="Search…"
                inputProps={{
                    'aria-label': 'search', onChange: (evt: React.ChangeEvent<HTMLInputElement>) => onChange(evt.target.value)
                }}
            />
        </SearchWrapper>
    );
}