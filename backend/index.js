const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const bodyParser = require('body-parser');
const regressionModel = require('./regressionModel');
const mongoose = require('mongoose');
const userRoutes = require('./users');
const contactRoutes = require('./routes/contact'); 

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

admin.initializeApp({
  credential: admin.credential.cert(require(process.env.FIREBASE_CONFIG_PATH)),
});

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://dipakchaudhari171:Dipak%404646@cluster.78kru4h.mongodb.net/alert_bridge?retryWrites=true&w=majority';

(async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: process.env.MONGODB_DBNAME || 'alert_bridge',
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
})();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/api', userRoutes);
app.use('/api', contactRoutes); 

app.get('/', (req, res) => {
  res.send('Backend is running');
});

io.on('connection', (socket) => {
  console.log('A user connected: ', socket.id);

  socket.on('userUnsafe', (data) => {
    console.log('Unsafe report received: ', data);
    io.emit('reportUnsafe', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected: ', socket.id);
  });
});

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
