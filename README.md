# 🚨 AlertBridge

**AlertBridge** is a disaster readiness and response web application built using the **MERN stack (MongoDB, Express.js, React, Node.js)**. It aims to bridge the communication gap during emergencies by enabling real-time alerts, location tracking, and centralized admin control, thereby enhancing coordination and safety.

---

## 📌 Features

### ✅ User Side
- 📍 **Location Detection**: Automatically fetches the user’s real-time location.
- 🆘 **“I Am Unsafe” Button**: Instantly sends the user’s location to the admin panel.
- 🌦️ **Live Weather Info**: Shows real-time weather based on location.
- 📩 **Login/Signup**: Supports authentication for Job Seekers, Employers, and Admins.
- 🌐 **Responsive UI**: Tailwind CSS-based modern design.

### ✅ Admin Side
- 🗺️ **Live Alerts Dashboard**: View location-based alerts from users in real-time.
- 📊 **Analytics**: View location trends, alert heatmaps (future enhancement).
- 📥 **Data Management**: Manage user data and incoming alert messages.

---

## 🛠️ Tech Stack

| Technology | Description |
|------------|-------------|
| **React.js** | Frontend UI |
| **Node.js & Express.js** | Backend REST API |
| **MongoDB** | NoSQL Database |
| **Socket.io** | Real-time communication |
| **Tailwind CSS** | Styling framework |
| **OpenWeatherMap API** | Weather information |
| **Geolocation API** | To fetch user coordinates |

````

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/AlertBridge.git
cd AlertBridge
````

### 2. Setup Backend

```bash
cd backend
npm install
node server.js
```

### 3. Setup Frontend

```bash
cd frontend
npm install
npm start
```

> Make sure MongoDB is running and replace environment variables as needed in `.env`.

---

## 🌍 Environment Variables

Create a `.env` file in the backend directory with the following:

```env
PORT=5000
MONGO_URI=your_mongo_connection_string
WEATHER_API_KEY=your_openweathermap_api_key
```

---

## 🚧 Future Enhancements

* 📊 Real-time disaster heatmaps
* 📱 PWA support for offline use
* 📌 SMS/Email alerts integration
* 🔐 Role-based dashboards with detailed logs

---

## 🙌 Contribution

Feel free to fork and submit pull requests! Any feedback or suggestions are welcome.

---


## 👨‍💻 Author

**Dipak Chaudhari**
🚀 BTech CSE | Web Dev Enthusiast
📫 Email: [dipak@example.com](mailto:dipakchaudhari171@gmail.com)
🌐 [LinkedIn](https://linkedin.com/in/dipak-chaudhari-813669248/) | [GitHub](https://github.com/dchaudhari7177)


```
