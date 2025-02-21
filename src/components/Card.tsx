import React from 'react';
import { CardProps } from "../types/props";
import '../styles/card.css'; 


const Card: React.FC<CardProps> = ({ article, className = '' }) => {
  return (
    <div className={`card ${className}`}>
    {article.imageUrl && (
      <img src={article.imageUrl} alt={article.title} className="card-image" />
    )}
    <div className="card-content">
      <h3 className="card-title">{article.title}</h3>
      <p className="card-description">{article.description}</p>
      <div className="card-footer">
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="card-link"
        >
          Read more
        </a>
        <div className="card-meta">
          <span className="card-date">{article.publishedAt}</span>
          <span className="card-source">{article.source}</span>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Card;