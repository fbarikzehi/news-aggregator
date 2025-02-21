import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArticleList from '../components/ArticleList';
import DatePicker from '../components/DatePicker';
import SearchBar from '../components/SearchBar';
import {  setArticles} from '../features/newsSlice';
import { fetchNewsArticles } from '../services/newsService';
import { RootState } from '../store';
import Select from '../components/Select';
import { categories,sources } from "../constant";
import   "../styles/news.css";


const News: React.FC = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.news.filters);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    setError(null); 
    setLoading(true);
    try {
      const data = await fetchNewsArticles(filters);
      dispatch(setArticles(data));
    } catch (error) {
      setError('Failed to fetch articles. Please try again later.');
      console.error('Error in handleSearch:', error);
    }finally{
      setLoading(false);
    }
  };

  
  useEffect(() => {
    handleSearch();
  }, [filters]);

  return (
    <div className="news-page">
    <div className="error-container">
      {error && <div className="error-message">{error}</div>}
    </div>
    <div className="filters-container">
      <div className="search-bar-container">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="date-picker-container">
        <DatePicker />
      </div>
      <div className="selects-container">
        <Select label="Category" options={categories} filterKey="category" />
        <Select label="Source" options={sources} filterKey="source" />
      </div>
    </div>
    <div className="articles-container">
      {loading ? (
        <div className="loading-indicator">Loading...</div>
      ) : (
        <ArticleList />
      )}
    </div>
  </div>
  );
};

export default News;
