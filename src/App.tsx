import React, { useState, useEffect } from 'react';
import { fetchArticles } from './services/newsService';
import { Article } from './types/article';

const App: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filters, setFilters] = useState({ keyword: '', category: '', source: '' });

  const handleSearch = async () => {
    const data = await fetchArticles(filters);
    setArticles(data);
  };

  return (
    <div className="app">
      <h1>News Aggregator</h1>

    </div>
  );
};

export default App;