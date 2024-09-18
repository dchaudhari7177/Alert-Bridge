const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const bodyParser = require('body-parser');
const regressionModel = require('./regressionModel'); // New file for model evaluation

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",  // Replace with your frontend port
    methods: ["GET", "POST"],
  },
});

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(require(process.env.FIREBASE_CONFIG_PATH)),
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Test Route
app.get('/', (req, res) => {
  res.send('Backend is running');
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('A user connected: ', socket.id);

  // Listen for userUnsafe event from dashboard
  socket.on('userUnsafe', (data) => {
    console.log('Unsafe report received: ', data);
    
    // Emit the data to the admin dashboard
    io.emit('reportUnsafe', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected: ', socket.id);
  });
});

// Route for evaluating earthquake and flood risks
app.post('/evaluate-risks', (req, res) => {
  const { temperature, humidity, windSpeed } = req.body;
  const earthquakeRisk = regressionModel.evaluateEarthquakeRisk(temperature, humidity, windSpeed);
  const floodRisk = regressionModel.evaluateFloodRisk(temperature, humidity, windSpeed);

  res.json({ earthquakeRisk, floodRisk });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
