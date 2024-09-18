import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import io from 'socket.io-client';
import Chatbot from '../components/Chatbot';

const socket = io('http://localhost:5000');

const Dashboard = () => {
  const { userLocation } = useContext(AuthContext);
  const [weatherData, setWeatherData] = useState(null);
  const [precautions, setPrecautions] = useState('');
  const [trainedModel, setTrainedModel] = useState(null);  
  const [forecastData, setForecastData] = useState(null);  
  const [earthquakeData, setEarthquakeData] = useState([]); 
  const [unsafeText, setUnsafeText] = useState(''); 
  const [predictedEarthquakeRisk, setPredictedEarthquakeRisk] = useState(null); 

  const API_KEY = '3e3e546e38846f06bc1e74ea591cc753';
  const EARTHQUAKE_API_URL = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&orderby=time&limit=5';

  useEffect(() => {
    if (userLocation) {
      const fetchWeatherData = async () => {
        const { latitude, longitude } = userLocation;
        try {
          const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
          );
          const weatherData = await weatherResponse.json();
          console.log('Weather data:', weatherData);
          setWeatherData(weatherData);

          const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
          );
          const forecastData = await forecastResponse.json();
          console.log('Forecast data:', forecastData);
          setForecastData(forecastData);

          // Perform additional checks for earthquakes
          await evaluateEarthquakeRisk(latitude, longitude);
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      };

      const evaluateEarthquakeRisk = async (latitude, longitude) => {
        try {
          const response = await fetch(EARTHQUAKE_API_URL);
          const data = await response.json();
          const recentEarthquakes = data.features;
          let risk = 0;

          recentEarthquakes.forEach((quake) => {
            const quakeLat = quake.geometry.coordinates[1];
            const quakeLon = quake.geometry.coordinates[0];
            const distance = calculateDistance(latitude, longitude, quakeLat, quakeLon);

            if (distance < 100) risk += 1; 
            if (distance < 50) risk += 2; 
          });

          setPredictedEarthquakeRisk(risk);
        } catch (error) {
          console.error('Error evaluating earthquake risk:', error);
        }
      };

      fetchWeatherData();
    }
  }, [userLocation]);

  const trainingData = [
    { x: [0, 80, 15], y: 1 },
    { x: [30, 40, 5], y: 2 },
    { x: [40, 20, 20], y: 3 },
  ];

  const trainLinearRegression = (data) => {
    const numFeatures = data[0].x.length;
    let weights = new Array(numFeatures).fill(0);
    const learningRate = 0.01;
    const epochs = 1000;

    for (let epoch = 0; epoch < epochs; epoch++) {
      data.forEach((point) => {
        const prediction = predict(point.x, weights);
        const error = prediction - point.y;
        weights = weights.map((weight, index) => weight - learningRate * error * point.x[index]);
      });
    }

    return weights;
  };

  const predict = (features, weights) => {
    return features.reduce((sum, feature, index) => sum + feature * weights[index], 0);
  };

  useEffect(() => {
    const model = trainLinearRegression(trainingData);
    setTrainedModel(model);
  }, []);

  useEffect(() => {
    if (weatherData && trainedModel) {
      generatePrecautions(weatherData);
    }
  }, [weatherData, trainedModel]);

  const generatePrecautions = (data) => {
    if (!trainedModel) {
      console.log('Model not trained yet.');
      return;
    }

    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    const inputFeatures = [temp, humidity, windSpeed];
    const predictedPrecautionLevel = predict(inputFeatures, trainedModel);

    console.log('Predicted Precaution Level:', predictedPrecautionLevel);

    let precautionMessage = '';

    if (predictedPrecautionLevel < 1.5) {
      precautionMessage = 'Precaution Level 3: Extreme weather conditions detected. Stay indoors if possible and follow safety guidelines.';
    } else if (predictedPrecautionLevel < 2.5) {
      precautionMessage = 'Precaution Level 2: The weather is mild. It is advisable to stay hydrated and wear appropriate clothing.';
    } else {
      precautionMessage = 'Precaution Level 1: The weather is cold and humid. Dress warmly and avoid extended outdoor activities.';
    }

    setPrecautions(precautionMessage);
  };

  const handleUnsafeClick = () => {
    if (userLocation) {
      const { latitude, longitude } = userLocation;
      socket.emit('userUnsafe', { latitude, longitude, text: unsafeText });
      alert('Your unsafe status has been reported to the admin.');
      setUnsafeText(''); // Clear the text input after sending
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    // Haversine formula to calculate distance between two points
    const R = 6371; // Radius of Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const dashboardStyles = {
    container: {
      display: 'flex',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #f2f2f2, #e0e0e0)',
    },
    leftSide: {
      width: '50%',
      backgroundColor: '#ffffff',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      borderRadius: '10px',
      margin: '20px',
      animation: 'fadeIn 1s ease-in-out',
    },
    rightSide: {
      width: '50%',
      backgroundColor: '#ffffff',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      borderRadius: '10px',
      margin: '20px',
      animation: 'fadeIn 1s ease-in-out',
    },
    weatherInfo: {
      marginBottom: '20px',
    },
    forecastTable: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    tableHeader: {
      backgroundColor: '#f8f8f8',
      color: '#333',
      padding: '10px',
      borderBottom: '1px solid #ddd',
    },
    tableRow: {
      borderBottom: '1px solid #ddd',
    },
    tableData: {
      padding: '10px',
    },
    button: {
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      backgroundColor: '#007BFF',
      color: '#fff',
      cursor: 'pointer',
      marginTop: '20px',
    },
    input: {
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      marginBottom: '20px',
      width: '100%',
    },
  };

  return (
    <div style={dashboardStyles.container}>
      <div style={dashboardStyles.leftSide}>
        <h2>Weather Information</h2>
        {weatherData && (
          <div style={dashboardStyles.weatherInfo}>
            <p><strong>Temperature:</strong> {weatherData.main.temp} °C</p>
            <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
            <p><strong>Wind Speed:</strong> {weatherData.wind.speed} m/s</p>
          </div>
        )}
        <h3>Safety Precautions</h3>
        {precautions ? <p>{precautions}</p> : <p>Loading...</p>}
        {forecastData && (
          <div>
            <h3>Weather Forecast</h3>
            <table style={dashboardStyles.forecastTable}>
              <thead>
                <tr>
                  <th style={dashboardStyles.tableHeader}>Date</th>
                  <th style={dashboardStyles.tableHeader}>Temperature (°C)</th>
                  <th style={dashboardStyles.tableHeader}>Humidity (%)</th>
                </tr>
              </thead>
              <tbody>
                {forecastData.list.slice(0, 5).map((forecast, index) => (
                  <tr key={index} style={dashboardStyles.tableRow}>
                    <td style={dashboardStyles.tableData}>{new Date(forecast.dt * 1000).toLocaleDateString()}</td>
                    <td style={dashboardStyles.tableData}>{forecast.main.temp}</td>
                    <td style={dashboardStyles.tableData}>{forecast.main.humidity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div style={dashboardStyles.rightSide}>
        <h2>Unsafe Report</h2>
        <input
          type="text"
          placeholder="Add any additional unsafe details"
          value={unsafeText}
          onChange={(e) => setUnsafeText(e.target.value)}
          style={dashboardStyles.input}
        />
        <button onClick={handleUnsafeClick} style={dashboardStyles.button}>
          I am unsafe
        </button>
        {predictedEarthquakeRisk !== null && (
          <div>
            <h3>Predicted Earthquake Risk</h3>
            <p>{predictedEarthquakeRisk > 0 ? `High Risk (Level ${predictedEarthquakeRisk})` : 'Low Risk'}</p>
          </div>
        )}
        <Chatbot />
      </div>
    </div>
  );
};

export default Dashboard;
