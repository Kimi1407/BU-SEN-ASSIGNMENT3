function sweatherweather() {
  const API_KEY = "2231d4006084906503100e220d4dabbf";
  const city = document.getElementById("location").value;

  if (!city) {
    alert("Please enter a location.");
    return;
  }

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;

  fetch(currentWeatherUrl)
    .then((response) => response.json())
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      console.error("Error fetching current weather data:", error);
      alert("Error fetching current weather data. Please try again.");
    });

  fetch(forecastUrl)
    .then((response) => response.json())
    .then((data) => {
      displayHourlyForecast(data.list);
    })
    .catch((error) => {
      console.error("Error fetching hourly forecast data:", error);
      alert("Error fetching hourly forecast data. Please try again.");
    });
}

function displayWeather(data) {
  const tempinfo = document.getElementById("temp");
  const weatherinfo = document.getElementById("info");
  const weathericon = document.getElementById("icon");

  tempinfo.innerHTML = "";
  weatherinfo.innerHTML = "";

  if (data.cod === "404") {
    weatherinfo.innerHTML = `<p>${data.message}</p>`;
  } else {
    const cityName = data.name;
    const temperature = Math.round(data.main.temp - 273.15);
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    const temperatureHTML = `<p>${temperature}°C</p>`;
    const weatherHTML = `<p>${cityName}</p><p>${description}</p>`;

    tempinfo.innerHTML = temperatureHTML;
    weatherinfo.innerHTML = weatherHTML;

    weathericon.src = iconUrl;
    weathericon.alt = description;

    showImage();
  }
}

function displayHourlyForecast(hourlyData) {
  const hourlyforecast = document.getElementById("hourlyforecast");
  hourlyforecast.innerHTML = "";

  const next24Hours = hourlyData.slice(0, 8);

  next24Hours.forEach((item) => {
    const dateTime = new Date(item.dt * 1000);
    const hour = dateTime.getHours().toString().padStart(2, "0");
    const temperature = Math.round(item.main.temp - 273.15);
    const iconCode = item.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

    const hourlyItemHtml = `
      <div class="hourly-item">
        <span>${hour}:00</span>
        <img src="${iconUrl}" alt="Hourly Weather Icon">
        <span>${temperature}°C</span>
      </div>
    `;
    hourlyforecast.innerHTML += hourlyItemHtml;
  });
}

function showImage() {
  const weatherIcon = document.getElementById("icon");
  weatherIcon.style.display = "block";
}
