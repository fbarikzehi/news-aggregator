import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilters } from '../features/newsSlice';
import { SearchBarProps } from "../types/props";
import  Button from "../components/Button";
import  Input from "../components/Input";

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const dispatch = useDispatch();
  
  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilters({ keyword: e.target.value, category: '', source: '', date: '' }));
  };

  return (
    <div className="search-bar-group">
    <Input
      type="text"
      onChange={handleKeywordChange}
      placeholder="Search by keyword"
      label="Search by keyword"
      className="search-bar-input"
    />
    <Button onClick={onSearch} variant="primary" size="large" className="search-bar-button">
      Search
    </Button>
  </div>
  );
};

export default SearchBar;