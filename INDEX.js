// Replace with your OpenWeatherMap API key
const apiKey = 'YOUR_API_KEY';

// Function to fetch weather data
function getWeather() {
    const city = document.getElementById('city').value;
    const errorMessage = document.getElementById('error-message');
    const loadingMessage = document.getElementById('loading');
    const weatherInfo = document.getElementById('weather-info');

    // Reset any previous error or loading messages
    errorMessage.textContent = "";
    loadingMessage.textContent = "Loading...";
    weatherInfo.style.display = 'none';

    // Validate city input
    if (!city) {
        errorMessage.textContent = "Please enter a city name.";
        return;
    }

    // Fetch weather data from OpenWeatherMap API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            // If the city is not found
            if (data.cod === '404') {
                errorMessage.textContent = "City not found!";
                loadingMessage.textContent = "";
            } else {
                // Hide loading message
                loadingMessage.textContent = "";

                // Display weather data
                weatherInfo.style.display = 'block';
                document.getElementById('city-name').textContent = data.name;
                document.getElementById('temperature').textContent = `${data.main.temp}°C`;
                document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
                document.getElementById('wind-speed').textContent = `Wind Speed: ${data.wind.speed} m/s`;
            }
        })
        .catch(error => {
            // Display error message in case of network error
            errorMessage.textContent = "Error fetching data. Please try again later.";
            loadingMessage.textContent = "";
        });
}
