import React, { useEffect, useState } from 'react';
import axios from 'axios';

const News = () => {
  const [articles, setArticles] = useState([]);  
  const [loading, setLoading] = useState(false);  
  const [page, setPage] = useState(1); 
  const [hasMore, setHasMore] = useState(true);  

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=disaster&sortBy=publishedAt&apiKey=9041a7de1802430db40d73b5810b7126&pageSize=20&page=${page}`
        );
        
        if (response.data.articles.length > 0) {
          setArticles((prevArticles) => [...prevArticles, ...response.data.articles]);  
        } else {
          setHasMore(false);  
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };

    fetchNews();
  }, [page]); 

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);  
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-600 text-center font-sans">
      <h1 className="text-4xl font-extrabold text-white mb-8 animate__animated animate__fadeIn animate__delay-1s">Latest News on Disasters</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out">
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="rounded-t-lg w-full h-56 object-cover mb-4 transition-all duration-500 hover:opacity-80"
                />
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    {article.title}
                  </a>
                </h3>
                <p className="text-gray-600 mb-4 text-sm line-clamp-3">{article.description}</p>
                <div className="text-gray-500 text-sm">
                  <p><strong>Author:</strong> {article.author || 'Unknown'}</p>
                  <p><strong>Published:</strong> {new Date(article.publishedAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-600">No articles found related to disasters.</div>
        )}
      </div>

      {hasMore && (
        <div className="text-center mt-6">
          <button 
            onClick={loadMore} 
            className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300"
          >
            {loading ? 'Loading...' : 'Load More Articles'}
          </button>
        </div>
      )}

      {!hasMore && !loading && (
        <div className="text-center mt-6 text-gray-500">
          No more articles to load.
        </div>
      )}
    </div>
  );
};

export default News;
