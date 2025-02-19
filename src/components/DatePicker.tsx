import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../features/newsSlice';
import { RootState } from '../store';
import '../styles/datePicker.css';

const DatePicker: React.FC = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector((state: RootState) => state.news.filters.date);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilters({ date: event.target.value, keyword: '', category: '', source: '' }));
  };

  return (
    <div className="date-picker">
      <label htmlFor="date" className="date-label">
        Select Date:
      </label>
      <input
        type="date"
        id="date"
        value={selectedDate}
        onChange={handleDateChange}
        className="date-input"
      />
    </div>
  );
};

export default DatePicker;