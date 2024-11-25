
import React from 'react';

interface Props {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInput: React.FC<Props> = ({ searchQuery, setSearchQuery }) => (
  <input
    type="text"
    placeholder="Search Pokemon by name..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="mb-10 p-3 border rounded-md w-full max-w-md text-xl"
  />
);

export default SearchInput;
