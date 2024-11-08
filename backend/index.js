const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const bodyParser = require('body-parser');
const regressionModel = require('./regressionModel'); 
const mongoose = require('mongoose'); 

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

mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find(); 
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
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
