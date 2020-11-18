import './style.scss';
import contentCreator from './helpers/contentCreator'
import {clearContent} from './helpers/helpers'

const key = 'c718936db7e8ffb4daa086761e71f389'

const body = document.querySelector('body')

const form = contentCreator.withText('form')

const weatherBox = contentCreator.withText('div', '', 'weatherBox')
const cityInput = contentCreator.withPlaceholder('input', 'text', 'Enter City Name...')
cityInput.autofocus = true
form.appendChild(cityInput)

const submitBtn = contentCreator.withValue('input', 'submit', "Check Weather")
submitBtn.onclick = (e) => {
  e.preventDefault()
  clearContent(weatherBox)
  getWeather(cityInput.value, key)
  cityInput.value = ''
}
form.appendChild(submitBtn)

body.appendChild(form)

body.appendChild(weatherBox);

const getWeather = async (cityName, key) => {
  const weatherBox = document.querySelector('.weatherBox')
 try {
   const weatherResult = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=metric`, { mode: 'cors'});
   const weatherJson = await weatherResult.json()
     console.log(weatherJson)
//somefunction
        const name = contentCreator.withText('p', `${weatherJson.name}`)
        weatherBox.appendChild(name)
        const country = contentCreator.withText('p', `${weatherJson.sys.country}`)
        weatherBox.appendChild(country)
        // const dateTime = contentCreator.withText('p', `${weatherJson.dt}`)
        // weatherBox.appendChild(dateTime)
        const feels_like = contentCreator.withText('p', `Feels like ${weatherJson.main.feels_like}deg C`)
        weatherBox.appendChild(feels_like)
        const actual = contentCreator.withText('p', `Actually ${weatherJson.main.temp}deg C`)
        weatherBox.appendChild(actual)
        const humidity = contentCreator.withText('p', `${weatherJson.main.humidity}% Humidity`)
        weatherBox.appendChild(humidity)
        const clouds = contentCreator.withText('p', `${weatherJson.clouds.all}% Cloudy`)
        weatherBox.appendChild(clouds)
        const description = contentCreator.withText('p', `${weatherJson.weather[0].description}`)
        weatherBox.appendChild(description)
        const windSpeed = contentCreator.withText('p', `${weatherJson.wind.speed}kph?`)
        weatherBox.appendChild(windSpeed)
        const windDeg = contentCreator.withText('p', `${weatherJson.wind.deg}deg`)
        weatherBox.appendChild(windDeg)
//endfunction
 } catch(err) {
      console.log(err)
    }
  // return weatherBox
}
