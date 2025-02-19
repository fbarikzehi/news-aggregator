import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArticleList from '../components/ArticleList';
import DatePicker from '../components/DatePicker';
import SearchBar from '../components/SearchBar';
import {  setArticles} from '../features/newsSlice';
import { fetchNewsArticles } from '../services/newsService';
import { RootState } from '../store';

const News: React.FC = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.news.filters);

  const handleSearch = async () => {
    const data = await fetchNewsArticles(filters);
    dispatch(setArticles(data));
  };

  
  useEffect(() => {
    handleSearch();
  }, [filters]);

  return (
    <div>
        <div>
          <div className="navbar-search">
          <SearchBar onSearch={handleSearch} />
          </div>
          <div>
          <DatePicker  />
          </div>
        </div>
        <div className="news">
          <ArticleList />
        </div>
    </div>
  );
};

export default News;
