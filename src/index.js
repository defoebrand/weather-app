import headerBackground from './assets/atmosphere-earth.jpeg';
import './style.scss';
import contentCreator from './helpers/contentCreator'
import {clearContent, capFirst} from './helpers/helpers'

const key = 'c718936db7e8ffb4daa086761e71f389'

const body = document.querySelector('body')

const header = contentCreator.withText('img', '', 'header')
header.style.backgroundImage = headerBackground
header.src = headerBackground
// header.style.backgroundImage = "url('./assets/atmosphere-earth.jpeg')"
body.appendChild(header)


const form = contentCreator.withText('form')

const weatherBox = contentCreator.withText('div', '', 'weatherBox')
const cityInput = contentCreator.withPlaceholder('input', 'text', 'Enter City Name...')
cityInput.autofocus = true
form.appendChild(cityInput)

const submitBtn = contentCreator.withValue('input', 'submit', "Check Weather")
submitBtn.onclick = (e) => {
  e.preventDefault()
  clearContent(weatherBox)
  getWeather(cityInput.value, key, weatherBox)
  cityInput.value = ''
}
form.appendChild(submitBtn)

body.appendChild(form)

body.appendChild(weatherBox);

const getWeather = async (cityName, key, weatherBox) => {
 try {
   const weatherResult = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=metric`, { mode: 'cors'});
   const weatherJson = await weatherResult.json()
     console.log(weatherJson)
//somefunction
        const name = contentCreator.withText('p', `${weatherJson.name}`, 'name')
        weatherBox.appendChild(name)
        const country = contentCreator.withText('p', `${weatherJson.sys.country}`, 'country')
        weatherBox.appendChild(country)
        // const dateTime = contentCreator.withText('p', `${weatherJson.dt}`, 'dateTime')
        // weatherBox.appendChild(dateTime)
        const feels_like = contentCreator.withText('p', `Feels like ${weatherJson.main.feels_like}deg C`, 'feels_like')
        weatherBox.appendChild(feels_like)
        const actual = contentCreator.withText('p', `Actual Temp ${weatherJson.main.temp}deg C`, 'actual_temp')
        weatherBox.appendChild(actual)
        // const humidity = contentCreator.withText('p', `${weatherJson.main.humidity}% Humidity`, 'humidity')
        // weatherBox.appendChild(humidity)
        const clouds = contentCreator.withText('p', `${weatherJson.clouds.all}% Cloudy`, 'cloudy')
        weatherBox.appendChild(clouds)
        const description = contentCreator.withText('p', `${capFirst(weatherJson.weather[0].description)}`, 'description')
        weatherBox.appendChild(description)
        const windSpeed = contentCreator.withText('p', `${weatherJson.wind.speed}kph?`, 'windSpeed')
        weatherBox.appendChild(windSpeed)
        const windDeg = contentCreator.withText('p', `${weatherJson.wind.deg}deg`, 'windDeg')
        weatherBox.appendChild(windDeg)
//endfunction
 } catch(err) {
      console.log(err)
    }
  // return weatherBox
}

getWeather('vilnius', key, weatherBox)
