import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../features/newsSlice';
import { RootState } from '../store';
import {SelectProps  } from "../types/props";


const Select: React.FC<SelectProps> = ({ label, options, filterKey, className = '' }) => {
  const dispatch = useDispatch();
  const selectedValue = useSelector((state: RootState) => state.news.filters[filterKey]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilters({ [filterKey]: event.target.value }));
  };

  return (
    <div className={`select-component ${className}`}>
      <label htmlFor={filterKey} className="select-label">
        {label}
      </label>
      <select
        id={filterKey}
        value={selectedValue || ''}
        onChange={handleChange}
        className="select-dropdown"
      >
        <option value="">All {label}s</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;