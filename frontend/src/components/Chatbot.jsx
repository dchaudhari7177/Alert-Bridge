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
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Bangalore&appid=${API_KEY}&units=metric`);
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
        botResponse = weatherData
          ? `Temperature: ${weatherData.main?.temp || 'N/A'}°C, Humidity: ${weatherData.main?.humidity || 'N/A'}%, Wind Speed: ${weatherData.wind?.speed || 'N/A'} m/s`
          : 'Weather data is not available.';
        break;
      case 'precautions':
        botResponse = precautions || 'No precautions available.';
        break;
      case 'description':
        botResponse = weatherData?.weather?.[0]?.description
          ? `Weather Condition: ${weatherData.weather[0].description}`
          : 'Weather description is not available.';
        break;
      default:
        botResponse = 'I am sorry, I did not understand that.';
    }

    const botMessage = { text: botResponse, isUser: false };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
  };

  const handleButtonClick = (type) => {
    let response = '';
    switch (type) {
      case 'weather':
        response = weatherData
          ? `Temperature: ${weatherData.main?.temp || 'N/A'}°C, Humidity: ${weatherData.main?.humidity || 'N/A'}%, Wind Speed: ${weatherData.wind?.speed || 'N/A'} m/s`
          : 'Weather data is not available.';
        break;
      case 'precautions':
        response = precautions || 'No precautions available.';
        break;
      case 'description':
        response = weatherData?.weather?.[0]?.description
          ? `Weather Condition: ${weatherData.weather[0].description}`
          : 'Weather description is not available.';
        break;
      default:
        response = 'I am sorry, I did not understand that.';
    }

    const botMessage = { text: response, isUser: false };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
  };

  return (
    <div className="fixed bottom-4 right-4 w-full max-w-xs bg-white rounded-lg shadow-lg overflow-hidden animate-fadeInUp transition-all duration-300">
      <div className="bg-blue-500 text-white text-center p-3 font-semibold text-lg">
        Chatbot
      </div>
      <div className="p-3 max-h-60 overflow-y-auto space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-md text-sm ${msg.isUser ? 'bg-blue-100 text-right animate-slideInRight' : 'bg-gray-100 text-left animate-slideInLeft'}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex p-3 space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 transition-all duration-150 animate-bounce"
        >
          Send
        </button>
      </div>
      <div className="p-3 grid grid-cols-3 gap-2">
        <button
          onClick={() => handleButtonClick('weather')}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-2 text-sm font-medium animate-pulse transition-transform transform hover:scale-105"
        >
          Current Weather
        </button>
        <button
          onClick={() => handleButtonClick('precautions')}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-2 text-sm font-medium animate-pulse transition-transform transform hover:scale-105"
        >
          Precautions
        </button>
        <button
          onClick={() => handleButtonClick('description')}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-2 text-sm font-medium animate-pulse transition-transform transform hover:scale-105"
        >
          Description
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
