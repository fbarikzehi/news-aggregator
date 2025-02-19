import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilters } from '../features/newsSlice';


interface SearchBarProps {
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const dispatch = useDispatch();

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilters({ keyword: e.target.value, category: '', source: '', date: '' }));
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by keyword"
        onChange={handleKeywordChange}
        className="search-input"
      />
      <button onClick={onSearch} className="search-button">
        Search
      </button>
    </div>
  );
};

export default SearchBar;