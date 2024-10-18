// News.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=disaster&sortBy=publishedAt&apiKey=9041a7de1802430db40d73b5810b7126`
        );
        setArticles(response.data.articles);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <div>Loading news...</div>;
  }

  return (
    <div style={newsContainerStyle}>
      <h1 style={headingStyle}>Disaster Updates</h1>
      {articles.map((article, index) => (
        <div key={index} style={articleStyle}>
          <h3 style={articleTitleStyle}>
            <a href={article.url} target="_blank" rel="noopener noreferrer" style={linkStyle}>
              {article.title}
            </a>
          </h3>
          <p style={descriptionStyle}>{article.description}</p>
          <p style={authorStyle}>
            <strong>Author:</strong> {article.author || 'Unknown'}
          </p>
          <p style={dateStyle}>
            <strong>Published on:</strong> {new Date(article.publishedAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

// CSS Styles
const newsContainerStyle = {
  padding: '20px',
  fontFamily: `'Poppins', sans-serif`,
  backgroundColor: '#F9F9F9',
  textAlign: 'center',
};

const headingStyle = {
  fontSize: '2rem',
  color: '#0077B6',
  marginBottom: '20px',
};

const articleStyle = {
  backgroundColor: '#FFF',
  borderRadius: '10px',
  padding: '15px',
  margin: '15px 0',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const articleTitleStyle = {
  fontSize: '1.5rem',
  color: '#333',
};

const linkStyle = {
  color: '#0077B6',
  textDecoration: 'none',
};

const descriptionStyle = {
  fontSize: '1rem',
  color: '#555',
  margin: '10px 0',
};

const authorStyle = {
  fontSize: '0.9rem',
  color: '#333',
};

const dateStyle = {
  fontSize: '0.9rem',
  color: '#777',
};

export default News;
