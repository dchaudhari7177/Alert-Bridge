import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import axios from 'axios';
import jsPDF from 'jspdf'; 
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';

const socket = io('http://localhost:5000');

const AdminDashboard = () => {
  const [unsafeReports, setUnsafeReports] = useState([]);
  const [map, setMap] = useState(null);
  const [currentLocation, setCurrentLocation] = useState([51.505, -0.09]);
  const [weatherData, setWeatherData] = useState(null);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const apiKey = '3e3e546e38846f06bc1e74ea591cc753';

  // Fetch unsafe reports and weather data
  useEffect(() => {
    socket.on('reportUnsafe', (data) => {
      setUnsafeReports((prevReports) => [...prevReports, data]);
      fetchWeatherData(data.latitude, data.longitude);

      if (map) {
        const newMarker = L.marker([data.latitude, data.longitude]).addTo(map);
        newMarker.bindPopup(`Unsafe location: Latitude: ${data.latitude}, Longitude: ${data.longitude}
          <br>Message: ${data.text || 'No message provided'}`)
          .openPopup();
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

  // Initialize the map
  useEffect(() => {
    const mapInstance = L.map('map').setView(currentLocation, 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(mapInstance);
    setMap(mapInstance);

    // Get the current location of the admin
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

  // Fetch weather data based on the given latitude and longitude
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

  // Handle clicking on service buttons (e.g., send police, medical services)
  const handleServiceClick = (serviceType) => {
    if (unsafeReports.length === 0) {
      alert('No unsafe reports available.');
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

  // Handle logout
  const handleLogout = () => {
    socket.emit('logout');
    navigate('/');
  };

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users');
        console.log(response.data); // Debugging: Check if users are fetched
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  // Generate PDF for users
  
  // Generate PDF for unsafe reports
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Unsafe Reports', 20, 20);

    if (unsafeReports.length === 0) {
      doc.text('No reports available', 20, 30);
      doc.save('unsafe_reports.pdf');
      return;
    }

    unsafeReports.forEach((report, index) => {
      const yPosition = 30 + index * 40;

      doc.text(`Report ${index + 1}:`, 20, yPosition);
      doc.text(`Latitude: ${report.latitude}`, 20, yPosition + 5);
      doc.text(`Longitude: ${report.longitude}`, 20, yPosition + 10);
      doc.text(`Message: ${report.text || 'No message provided'}`, 20, yPosition + 15);

      if (yPosition > 250) {
        doc.addPage();
      }
    });

    doc.save('unsafe_reports.pdf');
  };

  return (
    <div className="flex flex-col min-h-screen p-6 bg-gradient-to-br from-blue-100 to-green-100 overflow-auto">
      <div className="mb-4 text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-2">Admin Dashboard</h1>
        <p className="text-lg text-gray-600">Manage users, view analytics, and monitor reports here.</p>
       
        <button
          onClick={generatePDF}
          className="absolute top-6 right-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Download PDF
        </button>
      </div>

      {weatherData && (
        <div className="mb-6 p-4 bg-white rounded-lg shadow-md transition-transform transform hover:scale-105">
          <h3 className="text-2xl font-semibold text-blue-600">Users' Weather Info:</h3>
          <p className="text-lg">Temperature: <span className="font-bold">{weatherData.temp} °C</span></p>
          <p className="text-lg">Humidity: <span className="font-bold">{weatherData.humidity} %</span></p>
          <p className="text-lg">Description: <span className="font-bold">{weatherData.description}</span></p>
        </div>
      )}

      <h2 className="text-3xl font-semibold text-gray-800 mb-4">Unsafe Location Reports</h2>
      {unsafeReports.length > 0 ? (
        <ul className="mb-6 space-y-4">
          {unsafeReports.map((report, index) => (
            <li key={index} className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105">
              <p className="font-semibold">
                User at Latitude: {report.latitude}, Longitude: {report.longitude}
              </p>
              <p>Message: {report.text || 'No message provided'}</p>
              <button
                onClick={() => {
                  if (map) {
                    map.setView([report.latitude, report.longitude], 13);
                    L.marker([report.latitude, report.longitude])
                      .addTo(map)
                      .bindPopup(`Unsafe location: Latitude: ${report.latitude}, Longitude: ${report.longitude}
                        <br>Message: ${report.text || 'No message provided'}`)
                      .openPopup();
                  }
                }}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Show Location
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No unsafe reports available.</p>
      )}

      <div className="mb-6 space-y-4">
        <button
          onClick={() => handleServiceClick('Police')}
          className="px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
        >
          Send Police
        </button>
        <button
          onClick={() => handleServiceClick('Medical')}
          className="px-6 py-3 bg-yellow-600 text-white rounded-full hover:bg-yellow-700 transition-colors"
        >
          Send Medical Services
        </button>
        <button
          onClick={handleLogout}
          className="px-6 py-3 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors"
        >
          Logout
        </button>
      </div>

      <div id="map" className="w-full h-96"></div>
    </div>
  );
};

export default AdminDashboard;
