🌦️ Weather & AQI Map Application

A responsive weather map application built with React and Leaflet, featuring Weather, Temperature, and Air Quality Index (AQI) layers. The app is optimized for mobile devices, preventing accidental zoom while scrolling and allowing two-finger pinch zoom only on maps.

🚀 Features

🔍 Location Search with suggestions

🗺️ Interactive Map (Leaflet)

🌦️ Weather Layer (cloud coverage)

🌡️ Temperature Map

🫁 Air Quality Index (AQI) Visualization

📱 Mobile-Friendly UX

No accidental zoom on scroll

Two-finger pinch to zoom

🎨 Dynamic map legends

🔐 Environment variable support (.env)

🧰 Tech Stack

Frontend: React (Vite)

Maps: Leaflet, React-Leaflet

API: OpenWeatherMap

Styling: Tailwind CSS

Version Control: Git & GitHub


<------- folder structure ---->




├── public/
│   
│
├── src/
│   ├── components/
│   │   ├── MapView.jsx        # Leaflet map & weather layers
│   │   ├── SearchBar.jsx      # Location search input
│   │   ├── Suggestions.jsx   # Search suggestions dropdown
│   │   └── LayerToggle.jsx   # Weather / Temp / AQI buttons
│   │
│   ├── services/
│   │   └── weatherApi.js      # OpenWeatherMap API calls
│   │
│   ├── hooks/
│   │   └── useDebounce.js     # Debounced search input
│   │
│   ├── pages/
│   │   └── Home.jsx           # Main page layout
│   │
│   ├── App.jsx                # App root component
│   ├── main.jsx               # React DOM entry
│   └── index.css              # Global styles / Tailwind
│
├── .env.example               # Environment variable template
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
|___index.html




🧠 Architecture Overview ------->

User Action
   ↓
React State (layer, location, query)
   ↓
Leaflet Map
   ↓
OpenWeatherMap Tile Layers / APIs





📌 Future Improvements -------->

📍 Current location support

📊 AQI value tooltip on map click

🌓 Dark mode map layers

📡 Offline caching

🎛️ Fullscreen map mode

🤝 Contributing -------> 

Contributions are welcome!
Feel free to fork the repo and submit a pull request.