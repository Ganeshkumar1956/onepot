import React from 'react';

function SearchBar({ searchTerm, setSearchTerm }) {
    return (
        <input
            className='search-btn'
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
    );
}

export default SearchBar;
