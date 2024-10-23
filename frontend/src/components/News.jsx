import React, { useEffect, useState } from 'react';
import axios from 'axios';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredArticles, setFilteredArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=disaster&sortBy=publishedAt&apiKey=9041a7de1802430db40d73b5810b7126`
        );
        setArticles(response.data.articles);
        filterArticles(response.data.articles);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const filterArticles = (articles) => {
    const keywords = ['disaster', 'calamity', 'flood', 'earthquake', 'disease', 'pandemic', 'hurricane', 'wildfire'];
    const filtered = articles.filter(article =>
      keywords.some(keyword => 
        article.title.toLowerCase().includes(keyword) || 
        (article.description && article.description.toLowerCase().includes(keyword))
      )
    );
    setFilteredArticles(filtered);
  };

  if (loading) {
    return <div className="text-center text-lg">Loading news...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 text-center font-sans">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 animate-bounce">News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-4 transform transition-all hover:scale-105 hover:shadow-2xl">
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="rounded-t-lg w-full h-48 object-cover mb-4"
                />
              )}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {article.title}
                </a>
              </h3>
              <p className="text-gray-600 mb-2">{article.description}</p>
              <p className="text-gray-700 text-sm">
                <strong>Author:</strong> {article.author || 'Unknown'}
              </p>
              <p className="text-gray-500 text-sm">
                <strong>Published on:</strong> {new Date(article.publishedAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <div className="text-gray-600">No articles found related to disasters.</div>
        )}
      </div>
    </div>
  );
};

export default News;
