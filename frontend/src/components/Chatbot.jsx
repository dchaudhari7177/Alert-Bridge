

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Chatbot = ({ precautions }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_KEY = '3e3e546e38846f06bc1e74ea591cc753';

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}&units=metric`);
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  const handleSend = () => {
    if (input.trim() === '') return; 

    const newMessage = { text: input, isUser: true };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput('');

    let botResponse = '';
    switch (input.toLowerCase()) {
      case 'current weather':
        if (weatherData) {
          botResponse = `Temperature: ${weatherData.main?.temp || 'N/A'}°C, Humidity: ${weatherData.main?.humidity || 'N/A'}%, Wind Speed: ${weatherData.wind?.speed || 'N/A'} m/s`;
        } else {
          botResponse = 'Weather data is not available.';
        }
        break;
      case 'precautions':
        botResponse = precautions || 'No precautions available.';
        break;
      case 'description':
        if (weatherData && weatherData.weather && weatherData.weather.length > 0) {
          botResponse = `Weather Condition: ${weatherData.weather[0]?.description || 'No description available.'}`;
        } else {
          botResponse = 'Weather description is not available.';
        }
        break;
      default:
        botResponse = 'I am sorry, I did not understand that.';
    }

    console.log('Bot Response:', botResponse); 

    const botMessage = { text: botResponse, isUser: false };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
  };

  const handleButtonClick = (type) => {
    let response = '';
    switch (type) {
      case 'weather':
        if (weatherData) {
          response = `Temperature: ${weatherData.main?.temp || 'N/A'}°C, Humidity: ${weatherData.main?.humidity || 'N/A'}%, Wind Speed: ${weatherData.wind?.speed || 'N/A'} m/s`;
        } else {
          response = 'Weather data is not available.';
        }
        break;
      case 'precautions':
        response = precautions || 'No precautions available.';
        break;
      case 'description':
        if (weatherData && weatherData.weather && weatherData.weather.length > 0) {
          response = `Weather Condition: ${weatherData.weather[0]?.description || 'No description available.'}`;
        } else {
          response = 'Weather description is not available.';
        }
        break;
      default:
        response = 'I am sorry, I did not understand that.';
    }

    console.log('Button Click Response:', response); 

    const botMessage = { text: response, isUser: false };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
  };

  const chatbotStyles = {
    container: {
      width: '100%',
      maxWidth: '400px',
      backgroundColor: '#ffffff',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      padding: '10px',
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      display: 'flex',
      flexDirection: 'column',
    },
    header: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '10px',
      borderBottom: '1px solid #ddd',
      paddingBottom: '5px',
    },
    messages: {
      flex: 1,
      maxHeight: '200px',
      overflowY: 'auto',
      marginBottom: '10px',
      paddingRight: '10px',
    },
    message: {
      padding: '10px',
      borderRadius: '8px',
      marginBottom: '5px',
      maxWidth: '80%',
      wordWrap: 'break-word',
    },
    userMessage: {
      backgroundColor: '#d9fdd3',
      alignSelf: 'flex-end',
    },
    botMessage: {
      backgroundColor: '#f1f1f1',
      alignSelf: 'flex-start',
    },
    inputContainer: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '10px',
    },
    input: {
      flex: '1',
      padding: '8px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      marginRight: '10px',
    },
    button: {
      padding: '8px 16px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    quickButton: {
      marginTop: '10px',
      padding: '8px 16px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      display: 'block',
      width: '100%',
    },
  };

  return (
    <div style={chatbotStyles.container}>
      <div style={chatbotStyles.header}>Chatbot</div>
      <div style={chatbotStyles.messages}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...chatbotStyles.message,
              ...(msg.isUser ? chatbotStyles.userMessage : chatbotStyles.botMessage),
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div style={chatbotStyles.inputContainer}>
        <input
          style={chatbotStyles.input}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          style={chatbotStyles.button}
          onClick={handleSend}
        >
          Send
        </button>
      </div>
      <button
        style={chatbotStyles.quickButton}
        onClick={() => handleButtonClick('weather')}
      >
        Current Weather
      </button>
      <button
        style={chatbotStyles.quickButton}
        onClick={() => handleButtonClick('precautions')}
      >
        Precautions
      </button>
      <button
        style={chatbotStyles.quickButton}
        onClick={() => handleButtonClick('description')}
      >
        Description
      </button>
    </div>
  );
};

export default Chatbot;
