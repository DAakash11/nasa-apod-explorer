NASA APOD Explorer

An interactive full-stack web application that allows users to explore NASA's Astronomy Picture of the Day (APOD) using various filters like specific dates, date ranges, and random selections. Built with React, Node.js, and Express. Responsive, visually rich, and optimized for mobile.

Features

- Fetch APOD by date, date range, or randomly by count
- Support for images and videos
- Responsive grid layout for mobile and desktop
- Highlight today’s APOD with a special badge
- Optional dark mode toggle
- Media type tagging
- Fast and lightweight thanks to Vite and Express

Tech Stack

- Frontend: React (Vite)
- Backend: Node.js + Express
- API: [NASA Open API](https://api.nasa.gov/)
- Deployment: Azure (App Service or Virtual Machine)

How to Run Locally

1. Clone the Repository

git clone https://github.com/DAakash11/nasa-apod-explorer.git
cd nasa-apod-explorer

2. Backend Setup

cd backend
npm install
touch .env

🔑 .env

NASA_API_KEY=your_nasa_api_key

node index.js

This starts the backend at:

http://localhost:5000/api/apod

3. Frontend Setup

cd ../frontend
npm install
npm run dev

App runs on:

http://localhost:5173

🌐 Live Demo
Frontend URL: http://51.104.6.37
Backend API: http://51.104.6.37:5000/api/apod

🤝 Acknowledgements
NASA Open APIs
Vite
React
Express
