import React from 'react';
import {BiSearch} from 'react-icons/bi';

interface SearchBarProps {
    query: string;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/**** */
const SearchBar = ({query, handleInputChange}: SearchBarProps) => {
    return (
        <div className='relative w-3/4 mx-auto mt-8'>
            <div className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600'>
                <BiSearch size={20} />
            </div>
            <input
                type='text'
                value={query}
                onChange={handleInputChange}
                placeholder='Search for any course...'
                className='w-full font-abhaya text-lg pl-10 py-2 border border-gray focus:outline-none focus:ring-2 focus:ring-primary'
            />
        </div>
    );
};

export default SearchBar;
