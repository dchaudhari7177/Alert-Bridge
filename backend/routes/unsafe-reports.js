const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const reportRoutes = require('./routes/reports');

app.use(cors());
app.use(express.json());

app.use('/api/reports', reportRoutes); // Add your reports route here

mongoose.connect('mongodb://localhost:27017/alertbridge', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.listen(5000, () => console.log('Server is running on port 5000'));
