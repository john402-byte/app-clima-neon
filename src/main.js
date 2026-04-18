import './style.css';

// 🔒 Vite trae tu llave de forma segura
const API_KEY = import.meta.env.VITE_API_KEY;

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherCard = document.getElementById('weatherCard');
const closeBtn = document.getElementById('closeBtn');

async function checkWeather(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`;
    const response = await fetch(url);
    
    if (!response.ok) {
      alert("CIUDAD NO ENCONTRADA EN LA BASE DE DATOS.");
      return;
    }

    const data = await response.json();

    document.getElementById('cityName').innerText = data.name;
    document.getElementById('temperature').innerText = Math.round(data.main.temp) + "°C";
    document.getElementById('weatherDesc').innerText = data.weather[0].description;
    document.getElementById('humidity').innerText = data.main.humidity + "%";
    document.getElementById('windSpeed').innerText = data.wind.speed + " km/h";
    
    const iconCode = data.weather[0].icon;
    document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    weatherCard.classList.remove('d-none');
    
  } catch (error) {
    console.error("Error al conectar con la API:", error);
  }
}

searchBtn.addEventListener('click', () => {
  if (cityInput.value !== "") checkWeather(cityInput.value);
});

cityInput.addEventListener('keypress', (event) => {
  if (event.key === "Enter" && cityInput.value !== "") checkWeather(cityInput.value);
});

closeBtn.addEventListener('click', () => {
  weatherCard.classList.add('d-none');
  cityInput.value = ""; 
});