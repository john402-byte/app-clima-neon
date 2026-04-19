import './style.css'

const API_KEY = "7752800185464718be9223245261804";

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherCard = document.getElementById('weatherCard');

async function checkWeather(city) {
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&lang=es`;
        const response = await fetch(url);
        const data = await response.json();

        if (response.status !== 200) {
            alert("CIUDAD NO ENCONTRADA");
            return;
        }

        document.getElementById('cityName').innerText = data.location.name;
        document.getElementById('temperature').innerText = Math.round(data.current.temp_c) + "°C";
        document.getElementById('weatherDesc').innerText = data.current.condition.text;
        document.getElementById('humidity').innerText = data.current.humidity + "%";
        document.getElementById('windSpeed').innerText = data.current.wind_kph + " km/h";
        document.getElementById('weatherIcon').src = "https:" + data.current.condition.icon;

        // Mostrar la tarjeta
        weatherCard.classList.remove('d-none');

    } catch (error) {
        console.error("Error:", error);
    }
}

// Evento para el botón
searchBtn.addEventListener('click', () => {
    if (cityInput.value.trim() !== "") {
        checkWeather(cityInput.value);
    }
});

// Evento para la tecla Enter
cityInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        checkWeather(cityInput.value);
    }
});