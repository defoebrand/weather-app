import contentCreator from './contentCreator'
import { capFirst, clearContent } from './helpers'

  const chooseUnit = () => {
    const unitValue = document.getElementById('C')
    let unit = 'C'
    if (unitValue.checked !== true){
      unit = 'F'
    }
    return unit
  }

  const printWeather = (weatherBox, weatherJson, unit) => {
    let speed = 'km/h'
    if(unit === 'metric'){
      speed = 'km/h'
    } else {
      speed = 'mph'
    }
    weatherBox.appendChild(contentCreator.withText(
      'p', 'Location:', 'location'))
    weatherBox.appendChild(contentCreator.withText(
      'p', `${weatherJson.name}`, 'name'))
    weatherBox.appendChild(contentCreator.withText(
      'p', `${weatherJson.sys.country}`, 'country'))
    weatherBox.appendChild(contentCreator.withText(
      'p', '', 'empty'))
    weatherBox.appendChild(contentCreator.withText(
      'p', 'Feels Like:', 'feels_head'))
    weatherBox.appendChild(contentCreator.withText(
      'p', 'Actual Temp:', 'actual_head'))
    weatherBox.appendChild(contentCreator.withText(
      'p', 'Temperature:', 'temperature'))
    weatherBox.appendChild(contentCreator.withHTML(
      'p', `${weatherJson.main.feels_like}<sup>°${chooseUnit()}</sup>`, 'feels_like'))
    weatherBox.appendChild(contentCreator.withHTML(
      'p', `${weatherJson.main.temp}<sup>°${chooseUnit()}</sup>`, 'actual_temp'))
    weatherBox.appendChild(contentCreator.withText(
      'p', `${weatherJson.main.humidity}% Humidity`, 'humidity'))
    weatherBox.appendChild(contentCreator.withText(
      'p', `${weatherJson.clouds.all}% Cloudy`, 'cloudy'))
    weatherBox.appendChild(contentCreator.withText(
      'p', `${capFirst(weatherJson.weather[0].description)}`, 'description'))
    weatherBox.appendChild(contentCreator.withText(
      'p', 'Wind Conditions:'))
    weatherBox.appendChild(contentCreator.withText(
      'p', `${weatherJson.wind.speed} ${speed}`, 'windSpeed'))
    weatherBox.appendChild(contentCreator.withText(
      'p', `${weatherJson.wind.deg}°`, 'windDeg'))
  };

  const getWeather = async (cityName, weatherBox) => {
    const radioC = document.getElementById('C')
    const radioF = document.getElementById('F')
    let unit = 'metric'
    if(radioC.checked == true){
      unit = 'metric'
    } else {
      unit = 'imperial'
    }
    radioF.onchange = () => {
      clearContent(weatherBox)
      getWeather(cityName, weatherBox)
    }
    radioC.onchange = () => {
      clearContent(weatherBox)
      getWeather(cityName, weatherBox)
    }
   try {
     const weatherResult = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=c718936db7e8ffb4daa086761e71f389&units=${unit}`, {
       mode: 'cors'});
     const weatherJson = await weatherResult.json()
       printWeather(weatherBox, weatherJson, unit)
   } catch(err) {
     document.body.appendChild(contentCreator.withText('p', err))
      }
  }

  export { getWeather, chooseUnit }
