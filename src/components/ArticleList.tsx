import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Article } from '../types/index';
import '../styles/article.css';

const ArticleList: React.FC = () => {
  const articles = useSelector((state: RootState) => state.news.articles);

  return (
    <div className="article-list">
      {articles.map((article: Article) => (
        <div key={article.url} className="article-card">
          {article.imageUrl && (
            <img src={article.imageUrl} alt={article.title} className="article-image" />
          )}
          <h3 className="article-title">{article.title}</h3>
          <p className="article-description">{article.description}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer" className="article-link">
            Read more
          </a>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;