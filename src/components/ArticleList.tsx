import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Card from "./Card";
import '../styles/article.css';

const ArticleList: React.FC = () => {
  const articles = useSelector((state: RootState) => state.news.articles);

  if (!articles || articles.length === 0) {
    return <p className="article-list-empty">No articles found.</p>;
  }

  return (
    <div className="article-list">
      {articles.map((article) => (
        <Card key={article.url} article={article} />
      ))}
    </div>
  );
};

export default ArticleList;