ADMIN



import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

const socket = io('http://localhost:5000');

const AdminDashboard = () => {
  const [unsafeReports, setUnsafeReports] = useState([]);
  const [map, setMap] = useState(null); 
  const [currentLocation, setCurrentLocation] = useState([51.505, -0.09]); 
  const [userMarkers, setUserMarkers] = useState([]);
  const [weatherData, setWeatherData] = useState(null);

  const navigate = useNavigate(); 

  const apiKey = '3e3e546e38846f06bc1e74ea591cc753'; 

  useEffect(() => {
    socket.on('reportUnsafe', (data) => {
      console.log('Unsafe report received:', data);
      setUnsafeReports((prevReports) => [...prevReports, data]);

      fetchWeatherData(data.latitude, data.longitude);

      if (map) {
        const newMarker = L.marker([data.latitude, data.longitude]).addTo(map);
        newMarker.bindPopup(`
          Unsafe location: Latitude: ${data.latitude}, Longitude: ${data.longitude}
          <br>Message: ${data.text || 'No message provided'}
        `).openPopup();
        setUserMarkers((prevMarkers) => [...prevMarkers, newMarker]);
      }
    });

    return () => {
      socket.off('reportUnsafe');
      if (map) {
        map.eachLayer((layer) => {
          if (layer instanceof L.Marker) {
            map.removeLayer(layer);
          }
        });
      }
    };
  }, [map]);

  useEffect(() => {
    const mapInstance = L.map('map').setView(currentLocation, 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(mapInstance);
    setMap(mapInstance);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation([latitude, longitude]);
        mapInstance.setView([latitude, longitude], 13); 
        L.marker([latitude, longitude]).addTo(mapInstance).bindPopup('Admin Location').openPopup();
      });
    }

    return () => {
      mapInstance.remove();
    };
  }, []);

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
      );
      const data = response.data;
      setWeatherData({
        temp: data.main.temp,
        humidity: data.main.humidity,
        description: data.weather[0].description,
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleServiceClick = (serviceType) => {
    if (unsafeReports.length === 0) {
      alert("No unsafe reports available.");
      return;
    }

    const latestReport = unsafeReports[unsafeReports.length - 1]; 
    const serviceData = {
      latitude: latestReport.latitude,
      longitude: latestReport.longitude,
      service: serviceType,
    };

    socket.emit('sendService', serviceData); 
    alert(`${serviceType} service sent to (${latestReport.latitude}, ${latestReport.longitude})`);
  };

  const handleLogout = () => {
    socket.emit('logout');
    navigate('/'); 
  };

  return (
    <div style={dashboardContainerStyle}>
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin! Here you can manage users, view analytics, and more.</p>

      {weatherData && (
        <div style={weatherInfoStyle}>
          <h3>Users Weather Info:</h3>
          <p>Temperature: {weatherData.temp} °C</p>
          <p>Humidity: {weatherData.humidity} %</p>
          <p>Description: {weatherData.description}</p>
        </div>
      )}

      <h2>Unsafe Location Reports</h2>
      {unsafeReports.length > 0 ? (
        <ul>
          {unsafeReports.map((report, index) => (
            <li key={index}>
              User at Latitude: {report.latitude}, Longitude: {report.longitude}
              <br />
              Message: {report.text || 'No message provided'}
              <button
                onClick={() => {
                  if (map) {
                    map.setView([report.latitude, report.longitude], 13); 
                    L.marker([report.latitude, report.longitude]).addTo(map)
                      .bindPopup(`Unsafe location: Latitude: ${report.latitude}, Longitude: ${report.longitude}
                        <br>Message: ${report.text || 'No message provided'}`)
                      .openPopup();
                  }
                }}
                style={showOnMapButtonStyle}
              >
                Show Location
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No unsafe reports yet.</p>
      )}

      {/* Three buttons for service options */}
      

      <div id="map" style={mapStyle}></div> {/* Map container */}

      <button onClick={handleLogout} style={logoutButtonStyle}>
        Logout
      </button>
    </div>
  );
};

const dashboardContainerStyle = {
  padding: '20px',
  position: 'relative',
};

const logoutButtonStyle = {
  padding: '10px',
  backgroundColor: '#DC3545',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const showOnMapButtonStyle = {
  marginLeft: '10px',
  padding: '5px 10px',
  backgroundColor: '#007BFF',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const mapStyle = {
  height: '500px',
  marginTop: '20px',
};

const serviceButtonContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '20px',
};

const serviceButtonStyle = {
  padding: '10px 20px',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  flex: 1,
  margin: '0 10px',
};

const weatherInfoStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  padding: '10px',
  backgroundColor: '#f8f9fa',
  border: '1px solid #ccc',
  borderRadius: '5px',
};

export default AdminDashboard;
