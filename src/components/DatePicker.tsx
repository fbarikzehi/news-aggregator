import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../features/newsSlice';
import { RootState } from '../store';
import Input from "../components/Input";
import '../styles/datePicker.css';

const DatePicker: React.FC = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector((state: RootState) => state.news.filters.date);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilters({ date: new Date(event.target.value), keyword: '', category: '', source: '' }));
  };

  return (
    <div className="date-picker">
       <Input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        className="search-bar-input"
        label='Select Date'
      />
    </div>
  );
};

export default DatePicker;