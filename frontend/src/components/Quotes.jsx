import React, { useEffect, useState } from 'react';
import quotesData from './quotes.json'; // Assuming the quotes.json file is in the same folder

const Quotes = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  // Function to get a random quote from the quotesData array
  const fetchQuote = () => {
    try {
      setLoading(true);
      const randomIndex = Math.floor(Math.random() * quotesData.length);
      const randomQuote = quotesData[randomIndex];
      setQuote(randomQuote);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch a new quote.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch a quote when the component mounts
  useEffect(() => {
    fetchQuote();
  }, []);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div style={quoteContainerStyle}>
      {loading && <p style={loadingTextStyle}>Loading quote...</p>}
      {error && <p style={errorTextStyle}>{error}</p>}
      {quote && (
        <div style={quoteDisplayStyle}>
          <blockquote style={quoteTextStyle}>"{quote.content}"</blockquote>
          <p style={authorTextStyle}>— {quote.author}</p>
        </div>
      )}
      <button
        onClick={fetchQuote}
        style={isHovered ? { ...buttonStyle, ...hoveredButtonStyle } : buttonStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Get Another Quote
      </button>
    </div>
  );
};

// Basic styles for the quote display
const quoteContainerStyle = {
  padding: '20px',
  backgroundColor: '#f7f7f7',
  textAlign: 'center',
  borderRadius: '10px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  maxWidth: '600px',
  margin: '40px auto',
  transition: 'all 0.3s ease-in-out',
};

const quoteDisplayStyle = {
  marginBottom: '20px',
  padding: '20px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
};

const quoteTextStyle = {
  fontSize: '1.6rem',
  fontStyle: 'italic',
  color: '#333',
  marginBottom: '15px',
  transition: 'font-size 0.3s ease',
};

const authorTextStyle = {
  fontSize: '1.2rem',
  fontWeight: 'bold',
  color: '#555',
};

const buttonStyle = {
  padding: '12px 25px',
  backgroundColor: '#0077B6',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '1rem',
  transition: 'background-color 0.3s ease, transform 0.2s',
};

const hoveredButtonStyle = {
  backgroundColor: '#005f8c',
  transform: 'scale(1.1)',
};

const loadingTextStyle = {
  fontSize: '1.2rem',
  color: '#0077B6',
};

const errorTextStyle = {
  fontSize: '1.2rem',
  color: '#e74c3c',
  fontWeight: 'bold',
};

export default Quotes;
