document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  const API_KEY = "df0a31a279c95d608b358fd1245e1b1f";

  getWeatherBtn.addEventListener("click",  detailsCity);
  document.addEventListener("keydown" , (e) => {
    if(e.key === "Enter") detailsCity();
  })

  async function detailsCity() {
    const city = cityInput.value.trim();
    if (!city) return;

    try {
      let data = await showWeatherData(city);
      detailsOfWeather(data);
    } catch (error) {
      showError();
    }
  }

  async function showWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);
    console.log(response);
    
    if(!response.ok) throw new Error("City not found");

    let output = await response.json();
    hideError();
    return output;
  }

  function detailsOfWeather(data){
    console.log(data); 
    const {name , main , weather} = data;
    cityNameDisplay.textContent = `City : ${name}`;
    temperatureDisplay.textContent = `Temparature : ${main.temp}`;
    descriptionDisplay.textContent = `Description : ${weather[0].description}`;
  }

  function showError(){
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");

    cityNameDisplay.textContent = "";
    temperatureDisplay.textContent = "";
    descriptionDisplay.textContent = "";
  }

  function hideError(){
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }
})